const express = require("express");
const router = express.Router();
const {getBooks, createBook, updateBook, deleteBook, getBookById} = require("../Controller/book.js")

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;