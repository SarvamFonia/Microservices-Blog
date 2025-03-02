import React, { useEffect, useState } from 'react'
// import axios from 'axios'
const CommentList = ({comments}) => {

    // const [comments,setComments] = useState([]);

    // const fetchData = async() => {
    //     const res = await axios.get(`http://localhost:8050/posts/${postId}/comments`)

    //     setComments(res.data)
    // }

    // useEffect(()=>{
    //     fetchData();
    // },[])

    // console.log(comments)
    const renderedComments = comments.map(comment => {
      let content;
      if (comment.status === 'Approved'){
        content = comment.content;
      }
      if (comment.status === 'Pending'){
        content = "This comment is awaiting moderation";
      }
      if (comment.status === 'Rejected'){
        content = "This comment has been rejected"
      }

        return <li key={comment.id} >{content}</li>
    })

  return (
    <ul>
      {renderedComments}
    </ul>
  )
}

export default CommentList
