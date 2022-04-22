"use strict";

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

module.exports = { blogsList, blogsNew };
