"use strict";

const { response } = require("../../app");
const Blog = require("../../config/blogs");
const multer = require("multer");

//define storage for the images
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/public/uploads/blogs/image");
  },

  //add back the extenstion
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const blogsList = async (req, res) => {
  let blogs = await Blog.find().sort({ timeCreated: "desc" });

  res.render("blogs/blog.ejs", { blogs: blogs });
};

const blogsNew = (req, res) => {
  res.render("blogs/new.ejs");
};

//route that handles new post
const NewblogPost = async (req, res) => {
  console.log(req.files);
  console.log(req.files.filename);
  console.log(req.files[0].filename);
  console.log(req.files[1].filename);

  let blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    userImg: req.files[0].filename,
    img1: req.files[1].filename,
    img2: req.files[2].filename,
    img3: req.files[3].filename,
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

const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/blogs");
};

module.exports = {
  upload,
  blogsList,
  blogsNew,
  NewblogPost,
  findforSlug,
  findforId,
  editPut,
  deleteBlog,
};
