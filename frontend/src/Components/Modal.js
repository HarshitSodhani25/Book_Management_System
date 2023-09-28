import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'

const Modal = () => {
  const params = useParams();
  const [book, setBook] = useState(null);
  useEffect(()=>{
    const fetchBook = async () =>{
        const response = await fetch(`https://book-management-system-wlps.onrender.com/book/${params.id}`);
        const data = await response.json();
        setBook(data);
    }
    fetchBook();
  }, [params.id])
  return (
    <>
    { book && <div className="overlay">
        <div className='overlay-inner'>
            <Link to="/" className='close'><i class="fa-regular fa-circle-xmark"></i></Link>
            <div className="inner-box">
                <img src={book.coverImage} alt="" />
                <div className="info">
                    <h1>{book.title}</h1>
                    <h3>{book.authors.map(author=> <span>{author}</span>)}</h3>
                    <h4>{book.publisher} <span>{book.publishedDate}</span> <span> {book.language}</span></h4>
                    <a href={book.previewLink} target='_blank'><button>More</button></a>
                </div>
            </div>
            <div className='description'>
                {book.description}
            </div>
        </div>

    </div>}
    </>
  )
}

export default Modal