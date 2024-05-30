const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const validUser = users.filter((user)=>{
  return user.username === username;
});
if(validUser.length > 0){
  return true;
}

return false;}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});
if(validusers.length > 0){
  return true;
} else {
  return false;
}
};


//only registered users can login
regd_users.post("/login", (req,res) => {

  const username = req.body.username;
  const password = req.body.password;
 
  isValid(username);
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }});

//Write your code here
  

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const isbn = req.params.isbn;
  const review = req.query.review;

  // Check if the user has already posted a review for the same ISBN


  let getbook = books.filter((book)=>{
    return book.isbn === isbn;
    });

    let getreview = getbook.filter((review)=>{
      return review.username === username;
    });
 

  if (getreview !== -1) {
    // Modify the existing review
    books[getreview].review = review;
    return res.status(200).json({ message: "Review modified successfully" });
  } else {
    // Add a new review
    books[isbn].reviews.push({ username: username, review: review });
    return res.status(200).json({ message: "Review added successfully" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
