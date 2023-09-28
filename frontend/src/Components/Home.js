import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Card from "./Card"
import "../App.css"

const Home = ({books, setSelectedBook, socket}) => {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        socket.on('getNotifications', (message)=>{
            setNotifications([...notifications, message]);
        })
    }, [notifications, socket])

    return (
        <div>
            {notifications.length > 0 && console.log(notifications)}
            <div className="header">
                <h2 className="bell" onClick={()=>setOpen(!open)}>
                    <i className="fa-regular fa-bell iconImage"></i>
                    {notifications.length>0 && <div className='counter'>{notifications.length}</div>}
                </h2>
                <div className="row1">
                    <h1>A room without books is like <br/> a body without a soul. </h1>
                </div>
                <div className="row2">
                    <h2>Does u have a book? Upload here. </h2>
                    <Link to="/add-book" className="My_btn ">Add Book</Link>
                    <img src="./images/bgBook.png" alt="" />
                </div>
            </div>
            {open && notifications.length>0 && (
                <div className="notifications">
                    {notifications && notifications.map((notification, index)=>(
                        <Link to={`/${notification.id}`} key={index} className='notification'>
                            <div>{notification.message}</div>
                        </Link>
                    ))}
                    <button onClick={()=>{setNotifications([]); setOpen(!open)}} className="nButton">Mark as read</button>
                </div>
            )}
            <div className="container">
                <Card books={books} setSelectedBook = {setSelectedBook}/>
            </div>
        </div>
    )
}

export default Home