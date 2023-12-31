import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Components/Home";
import PageNotFound from "./Components/PageNotFound.js";
import CreateForm from "./Components/CreateForm";
import { useEffect, useState } from "react";
import "./App.css"
import Modal from "./Components/Modal";
import io from "socket.io-client"
const socket = io("https://book-management-system-wlps.onrender.com",{
  withCredentials: true
});

function App() {

  //state variables
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  
  //for getting all books
  useEffect(() => {
    const fetchBook = async () => {
        const response = await fetch(`https://book-management-system-wlps.onrender.com/book`);
        const data = await response.json();
        setBooks(data);
    }
    fetchBook();
}, [])

useEffect(()=>{
    //for getting the new book from server to add to books
    socket.on("bookAdded", (newBook)=>{
      setBooks([...books, newBook]);
    })
    
    //for getting the updated book from server to update to books
    socket.on('bookUpdated', (updateBook)=>{
      const updatedBooks = books.map((book)=>book._id===updateBook._id?updateBook:book)
      setBooks(updatedBooks);
    })
    
    //for getting the bookId from server to remove from books
    socket.on('bookDeleted', (id)=>{
      const newBooks = books.filter(book=>book._id !== id);
      setBooks(newBooks);
    })
    
    // return ()=>{
    //   socket.disconnect();
    // }
  }, [books])
  
  
  //for sending the new book to server
  const handleAddBook = (bookData) => {
    socket.emit('addBook', bookData);
  }
  
  //for sending the updated book to server
  const handleUpdateBook = (updateBook) =>{
    socket.emit('updateBook', updateBook);
  }

  //for sending the bookId to server for deleting
  const handleDeleteBook = (id) =>{
    socket.emit('deleteBook', id);
  }


  const router = createBrowserRouter([
    {path:"/", element:<Home books={books} setBooks={setBooks} setSelectedBook={setSelectedBook} socket={socket} ></Home>},
    {path:"/add-book", element:<CreateForm selectedBook = {selectedBook} setSelectedBook={setSelectedBook} handleAddBook={handleAddBook} handleUpdateBook={handleUpdateBook} handleDeleteBook={handleDeleteBook} />},
    {path:"/update-book/:id", element:<CreateForm selectedBook = {selectedBook} setSelectedBook={setSelectedBook} handleAddBook={handleAddBook} handleUpdateBook={handleUpdateBook} handleDeleteBook={handleDeleteBook} />},
    {path: "/:id", element:<Modal/>},
    {path: "*", element: <PageNotFound/>}
  ])


  return (
    <>
      <RouterProvider router={router}/>
    </>

  );
}

export default App;
