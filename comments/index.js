import express from 'express'
import {randomBytes} from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(cors())

const commnetsByPostId = {};

app.get('/posts/:id/comments', (req,res) => {
    res.status(200).send(commnetsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async(req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commnetsByPostId[req.params.id] || [];
    comments.push({id: commentId, content, status: 'Pending'});
    commnetsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:9000/events',{
        type: 'CommentCreated',
        data: {
            id: commentId, 
            content,
            status:'Pending',
            postId: req.params.id
        }
    })

    res.status(201).send(comments)
});

app.post('/events', async(req,res) => {
    const {type,data} = req.body;
    if(type === 'CommentModerated'){
        const {id,postId,status,content} = data;
        const comments = commnetsByPostId[postId];
        const comment = comments.find(comment => comment.id === id)
        comment.status = status


        await axios.post('http://localhost:9000/events',{
            type : 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content,
            }
        })
    }
    res.send({})
})

app.listen(8050, () => {
    console.log(`COMMENTs server listining at PORT 8050`)
});