"use strict";

const multer = require("multer");
const { response } = require("../../app");
const Blog = require("../../config/blogs");

const blogsList = (req, res) => {
  const blogs = [
    {
      title: "The Information we do not need",
      sinppet:
        "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
      author: "Somtea Codes",
      createdAt: new Date(),
      img: "image/mainImg1",
    },
    {
      title: "The Information we do not need",
      sinppet:
        "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
      author: "Somtea Codes",
      createdAt: new Date(),
      img: "image/mainImg1",
    },
    {
      title: "The Information we do not need",
      sinppet:
        "You’ve probably heard of Lorem Ipsum before – it’s the most-used dummy text excerpt out there. People use it because it has a fairly",
      author: "Somtea Codes",
      createdAt: new Date(),
      img: "image/mainImg1",
    },
  ];
  res.render("blogs/blog.ejs", { blogs: blogs });
};

const blogsNew = (req, res) => {
  res.render("blogs/new.ejs");
};

const slugFind = async (req, res) => {
  let blog = await Blog.findOne({ slug: req.params.slug });

  if (blog) {
    res.render("show", { blog: blog });
  } else {
    response.redirect("/blogs");
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "image/blogs");
  },

  //add back the extenstion
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const uploadImage = async (req, res) => {
  multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    img: req.file.filename,
  });
  try {
    blog = await blog.save();
    res.redirect(`blogs/${blog.slug}`);
  } catch (error) {
    console.log(error);
  }
  console.log(req.file);
};

module.exports = { blogsList, blogsNew, slugFind, uploadImage };
