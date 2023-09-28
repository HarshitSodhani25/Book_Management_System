const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    authors: {type: [String], require: true},
    publisher: {type: String, default: "Unknown"},
    description:{type: String, require: true},
    publishedDate: {type: String},
    language: {type: String},
    pages: {type: Number},
    coverImage: {type: String, default:"https://picsum.photos/picsum/400"},
    previewLink: {type:String, required:true},
})

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;