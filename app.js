//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = " This is a normal personal blog website where you can compose a post with title and its content. All the posts that are composed by you will be shown on the home page and as you keep on adding new post they will directly be shownn on the home page. ";
const aboutContent = "I'm learning web development so this website is made by the frameworks and technologies which I have learned so far. the database used for this website is MongoDB.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  postDetail: String
}

const Post = mongoose.model("Post",postSchema);


app.get("/",function(req,res){

  Post.find({}, function(err,posts){
    if(!err){
      res.render("home", { 
        homeText : homeStartingContent,
        posts: posts
      });
    }
  });
  
});

app.get("/about",function(req,res){
  res.render("about", { aboutText : aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact", {});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title: req.body.postTitle,
    postDetail: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  
});

app.get("/post/:postId",function(req,res){

  const postID = req.params.postId;

  Post.findOne({_id: postID}, function(err,post){

    if(!err){
        res.render("post",{
          Title: post.title,
          Detail: post.postDetail
        });
    }

  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
