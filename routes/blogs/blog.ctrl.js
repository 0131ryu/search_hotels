"use strict";

const multer = require("multer");
const { response } = require("../../app");
const Blog = require("../../config/blogs");

const blogsList = async (req, res) => {
  let blogs = await Blog.find().sort({ timeCreated: "desc" });

  res.render("blogs/blog.ejs", { blogs: blogs });
};

const blogsNew = (req, res) => {
  res.render("blogs/new.ejs");
};

//route that handles new post
const NewblogPost = async (req, res) => {
  // console.log(req.body)
  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
  });

  console.log(blog);

  try {
    blog = await blog.save();
    //console.log(blog.id);
    console.log(blog.slug);
    res.redirect(`${blog.slug}`);
  } catch (error) {
    console.log(error);
  }
};

const findforSlug = async (req, res) => {
  //res.send(req.params.id);
  // let blog = await Blog.findById(req.params.id);
  let blog = await Blog.findOne({ slug: req.params.slug });

  if (blog) {
    res.render("blogs/show.ejs", { blog: blog });
  } else {
    console.log(error);
    res.redirect("blogs/blog.ejs");
  }
};

const findforId = async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  res.render("blogs/edit.ejs", { blog: blog });
};

const editPut = async (req, res) => {
  req.blog = await Blog.findById(req.params.id);
  let blog = req.blog;
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.description = req.body.description;

  try {
    blog = await blog.save();
    res.redirect(`new/${blog.slug}`);
  } catch (error) {
    console.log(error);
    res.redirect(`blogs/edit/${blog.id}`, { blog: blog });
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

// const uploadImage = async (req, res) => {
//   multer({
//     storage: storage,
//     limits: {
//       fieldSize: 1024 * 1024 * 3,
//     },
//   });
//   let blog = new Blog({
//     title: req.body.title,
//     author: req.body.author,
//     description: req.body.description,
//     img: req.file.filename,
//   });
//   try {
//     blog = await blog.save();
//     res.redirect(`blogs/${blog.slug}`);
//   } catch (error) {
//     console.log(error);
//   }
//   console.log(req.file);
// };

module.exports = {
  blogsList,
  blogsNew,
  NewblogPost,
  findforSlug,
  findforId,
  editPut,
};
