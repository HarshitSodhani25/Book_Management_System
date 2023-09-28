import { useEffect } from 'react';
import {useForm} from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';


const CreateForm = ({setSelectedBook, selectedBook, handleUpdateBook, handleAddBook, handleDeleteBook}) => {

  const params = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm();

  useEffect(()=>{
    if(params.id && selectedBook){
      setValue('title', selectedBook.title);
      setValue('publisher', selectedBook.publisher);
      setValue('description', selectedBook.description);
      setValue('publishedDate', selectedBook.publishedDate);
      setValue('language', selectedBook.language);
      setValue('previewLink', selectedBook.previewLink);
      setValue('coverImage', selectedBook.coverImage);
      setValue('pages', selectedBook.pages);
      setValue('authors', selectedBook.authors.toString())
    }
  }, [params.id, selectedBook, setValue])

  const handleDelete = async () => {
    setSelectedBook(null);
    handleDeleteBook(params.id);
    reset();
    navigate("/")
  }

  const handleFormSubmit = async (data) => {
    data.authors = data.authors.split(' ');

    if(selectedBook && params.id){
      data["_id"] = params.id;
      handleUpdateBook(data);
      reset();
      alert("Book updated successfully");
      setSelectedBook(null);
      navigate("/");      
    }else{
      await handleAddBook(data);
      reset();
      alert("Book added successfully");
      navigate("/");
    }

  }

  const handleCancel= () => {
    reset();
    navigate("/");
  }

  

  return (
    <div className='form-container'>
      <form noValidate={true} onSubmit={handleSubmit(data=>(handleFormSubmit(data)))} className="form">
        <div className='row'>
          <div>
            <label htmlFor="title" className="form_label">Title</label>
            {errors.title && <div className="form_errors">{errors.title.message}</div>}
          </div>
          <input type="text" name="title" id="title" className="form_input" {...register('title', {required: 'title is required'})} />
        </div>

        <div className='row'>
          <div>
          <label htmlFor="authors" className="form_label">Author</label>
          {errors.authors && <div className="form_errors">{errors.authors.message}</div>}
          </div>
          <input type="text" name="authors" id="authors" className="form_input" {...register('authors', {required: 'author is required'})} />
        </div>

        <div className='row'>
          <label htmlFor="publisher" className="form_label">Publisher</label>
          <input type="text" name="publisher" id="publisher" className="form_input" {...register('publisher')} />
        </div>

        <div className='row'>
          <div>
          <label htmlFor="coverImage" className="form_label">Thumbnail</label>
        {errors.coverImage && <div className="form_errors">{errors.coverImage.message}</div>}
          </div>
          <input type="text" name="coverImage" id="coverImage" className="form_input" {...register('coverImage', {required:"thumbnail is required"})} />
        </div>

        <div className='row'>
          <div>
          <label htmlFor="previewLink" className="form_label">Preview Link</label>
        {errors.previewLink && <div className="form_errors">{errors.previewLink.message}</div>}
          </div>
          <input type="text" name="previewLink" id="previewLink" className="form_input" {...register('previewLink', {required:"preview link is required"})} />
        </div>

        <div className='row'>
          <div>
          <label htmlFor="description" className='textarea_label form_label'>Description</label>
        {errors.description && <div className="form_errors">{errors.description.message}</div>}
          </div>
          <textarea name="description" id="description" className='textarea_description form_input' cols="40" rows="6" {...register('description', {required:"description is required"})}></textarea>
        </div>

        <div className="row">
            <label htmlFor="language" className="form_label">Language</label>
            <select name="language" id="language" className='form_input' {...register('language')}>
              <option value="other">other</option>
              <option value="en">en</option>
              <option value="hi">hi</option>
              <option value="fr">fr</option>
              <option value="zh">zh</option>    {/*chinese*/}
              <option value="ja">ja</option>
            </select>
          </div>

        <div className='row'>
          <div>
            <label htmlFor="publishedDate" className="form_label">Published Date</label>
            <input type="text" name="publishedDate" id="publishedDate" className="form_input" {...register('publishedDate')} />
          </div>

          <div>
            <label htmlFor="pages" className="form_label">Pages</label>
            <input type="Number" name="pages" id="pages" className="form_input" {...register('pages', {minLength: 1, message: "Page count must be greater than 0"})} />
          </div>
        </div>

        <div className="row form_button">
          <button type="onSubmit" className='form_save'>{selectedBook?"Update":"Add Book"}</button>
          <button onClick={handleCancel} className='form_save cancel'>Cancel</button>
          {selectedBook && params.id && <button onClick={handleDelete} className='form_save cancel'>Delete</button>}
        </div>
      </form>
    </div>
  )
}
export default CreateForm;