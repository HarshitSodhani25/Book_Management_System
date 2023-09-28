import {Link, useNavigate} from "react-router-dom";

const Card = ({books, setSelectedBook}) => {
  const navigate = useNavigate();
  const handleUpdate = (book)=>{
    setSelectedBook(book);
    navigate(`update-book/${book._id}`);
  }
  return (
    <>
        {books && books.map(book=>(
          <div className="card" key={book._id}>
            <button className="update_book" onClick={e=>handleUpdate(book)}>Update Book</button>
            <img src={book.coverImage} alt="" />
            <Link to={`/${book._id}`} >
              <h3 className="title" >{book.title}</h3>
            </Link>
          </div>
        ))}
    </>
  )
}

export default Card