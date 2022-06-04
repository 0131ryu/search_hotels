const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth/auth");
const { User } = require("../models/home/user");
const { Product } = require("../models/home/Product");
const { Payment } = require("../models/pay/Payment");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  //요청된 이메일이 데이터베이스에 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //이메일이 있다면 비밀번호가 같은지 확인한다
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        //false
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      //비밀번호가 맞다면 token 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //토큰을 저장한다 어디에? 1. 쿠키, 2. 로컬스토리지
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

//${USER_SERVER}/addToCart
router.post("/addToCart", auth, (req, res) => {
  //User 정보 가져오기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let duplicate = false;

    //상품이 있는지, 없는지 확인
    userInfo.cart.forEach((item) => {
      if (item.id == req.body.productId) {
        duplicate = true;
      }
    });

    //상품이 이미 있으면 quantity += 1
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    } else {
      //상품이 없으면 cart에 정보 추가
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.cart);
        }
      );
    }
  });
});

//${USER_SERVER}/addToHeart
router.post("/addToHeart", auth, (req, res) => {
  //유저 정보 찾기
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    let overlap = false;

    //유저 정보 중 좋아요 값을 넣을 곳 있는지
    userInfo.heart.forEach((item) => {
      if (item.id == req.body.dataId) {
        overlap = true;
      }
    });

    //좋아요가 이미 눌러져 있다면
    if (overlap) {
      User.findOneAndUpdate(
        { _id: req.user._id, "heart.id": req.body.dataId },
        { $inc: { "heart.$.quantity": 0 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.heart);
        }
      );
    } else {
      //좋아요가 아직 눌러져있지 않다면
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            heart: {
              id: req.body.dataId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(userInfo.heart);
        }
      );
    }
  });
});

//removeFromCart
router.get("/removeFromCart", auth, (req, res) => {
  //먼저 cart안에 내가 지우려고 한 상품을 지우기
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: req.query.id } } },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );

  //product collection에 현재 남아있는 상품들의 정보를 가져오기
});

//successBuy
router.post("/successBuy", auth, (req, res) => {
  //1. User -> history 필드 안에 간단한 결제 정보 넣기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurChase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });
  //2. Paymnet 안에 있는 자세한 결제 정보 넣기
  //3. Product안에 있는 solde 필드-정보 업데이트 하기
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Increase the amount of number for the sold information

        //first We need to know how many product were sold in this transaction for
        // each of products

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        // first Item    quantity 2
        // second Item  quantity 3

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

module.exports = router;
