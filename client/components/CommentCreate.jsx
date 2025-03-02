import React, { useState } from 'react'
import axios from 'axios'
const CommentCreate = ({postId}) => {

    const [content,setContent] = useState('');

    const submitHandler = async(e) => {
        e.preventDefault()
        await axios.post(`http://localhost:8050/posts/${postId}/comments`,{content})
        setContent('')
    }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
            <label>New comment</label>
            <input className='form-control' onChange={e=>setContent(e.target.value)}></input>
            <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CommentCreate
