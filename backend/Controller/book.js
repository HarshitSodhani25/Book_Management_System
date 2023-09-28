const Book = require("../Model/book.js");

const createBook = async (req, res) => {
    const book = new Book(req.body);
    try {
        const response = await book.save();

        // //Emit a socket.io event to notify clients about the new book
        // io.emit('bookAdded', response);

        res.status(201).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

//for fetching all the books
const getBooks = async (req, res) => {
    try {
        let query = Book.find();
        if(req.query._page && req.query._limit){
            const pageSize = req.query._limit;
            const page = req.query._page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }
        const response = await query.exec();
        const totalBooks = await Book.find().count();
        res.set('x-total-count', totalBooks);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

//for fetching the book by book id 
const getBookById = async (req, res)=>{
    try {
        const response = await Book.findById(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//for updating the book by bookId
const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Book.findByIdAndUpdate(id, req.body, {new: true});

        // //emit a socket.io event to notify the clients about the updated book
        // io.emit('bookUpdated', response);
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
//for deleting the book by bookId
const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        await Book.findByIdAndDelete(id)
        res.status(200).json({"status": "success", "message": "item deleted successfully"});
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = {createBook, getBooks, updateBook, deleteBook, getBookById};