const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const mongoose = require('mongoose')
const socketIo = require("socket.io")
const Book = require("./Model/book.js")
const bookRoute = require("./Routes/book.js");

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const io = socketIo(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PATCH"],
        allowedHeaders: ["x-total-count"],
        credentials: true
    }
});


//middlewares
app.use(express.json());
app.use(cors({exposedHeaders: ['x-total-count'],}));
app.use("/book", bookRoute);


//for connecting the MongoDB server
const mongodbConnect = async () =>{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb connected successfully");
}
mongodbConnect();


//socket.io server-side code
io.on('connection', (socket)=>{
    console.log('A new user connected ');

    //for adding the book in the database sent from the frontend
    socket.on('addBook', async (bookData)=>{
        try {
            const newBook = new Book(bookData);
            const response = await newBook.save();
            let obj = {message: "A new book is added", id:response._id};

            // for sending the book to all clients 
            io.emit('bookAdded', response);
            io.emit('getNotifications', obj);
        } catch (error) {
            console.log(error.message);
        }
    })
    
    // for updating the book in the database sent from the frontend 
    socket.on('updateBook', async(updateBook)=>{
        try {
            const response = await Book.findByIdAndUpdate(updateBook._id,updateBook, {new:true});
            let obj = {message: "A book is updated", id:response._id};

            // for sending the book to all clients 
            io.emit('bookUpdated', response);
            io.emit('getNotifications', obj);
        } catch (error) {
            console.log(error.message)
        }
    })

    // for deleting the book from the database 
    socket.on('deleteBook', async(id)=>{
        try {
            await Book.findByIdAndDelete(id);
            let obj = {message: "A book is deleted", id:""};

            // for sending the id to all clients so to delete it 
            io.emit('bookDeleted', id);
            io.emit("getNotifications", obj);
        } catch (error) {
            console.log(error.message)
        }
    })

    socket.on('disconnect', ()=>{
        console.log('A user disconnected');
    })

})


//for starting the server on the given port
server.listen(port, ()=>console.log(`server started at http://localhost:${port}`));

// GET https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=process.env.GOOGLE_API
