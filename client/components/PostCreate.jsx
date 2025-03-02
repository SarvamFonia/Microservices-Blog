import React, { useState } from 'react'
import axios from 'axios'
const PostCreate = () => {

    const [title,setTitle] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:8000/posts',{title});
            
        }catch(err){
            console.log(err)
        }
        setTitle('')
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label>Title</label>
            <input className='form-control' value={title} onChange={e=> setTitle(e.target.value)}></input>
        </div>
        <button className='btn btn-primary'>Create Post</button>
      </form>
    </div>
  )
}

export default PostCreate
