const express = require('express');
const books = require('./booksdb.js');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
const username = req.body.username; 
const password = req.body.password;

if (!username|| !password){
  return res.json({message: "Username and password are required"});
}
for (let key in users){
  if (key === username){
    return res.status(400).json({message: "Username already exists"});

  }}

  const register=(username,password)=>{
    users[username] = password;
    return res.status(200).json({message: "User created successfully"});
  }


});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  for (let key in books) {
    if (key === isbn) {
      return res.status(200).json(books[key]);
  }}});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let bookList = [];
  for (let key in books) {
    if (books[key].author === author) {
      bookList.push(books[key]);
    }
  }return res.status(200).json(bookList);
});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let bookList = [];
  for (let key in books) {
    if (books[key].title === title) {
      bookList.push(books[key]);
    }
  }return res.status(200).json(bookList);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  for (let key in books) {
    if (key === isbn) {
      return res.status(200).json(books[key].reviews);
  }}}


);

module.exports.general = public_users;
