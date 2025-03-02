import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express()
app.use(express.json())
app.use(cors())

const posts = {};

const handelEvents = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, status, postId } = data;
        const post = posts[postId]
        post.comments.push({ id, content, status })
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        const post = posts[postId]
        const comment = post.comments.find(comment => comment.id === id)

        comment.status = status;
        comment.content = content;

    }
}

app.get('/posts', async (req, res) => {
    res.status(200).send(posts);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    handelEvents(type, data)

    res.status(200).send({})
});

app.listen(8080, async() => {
    console.log('Query service listining on port 8080')
    const res = await axios.get('http://localhost:9000/events');

    for(let event in res.data){
        console.log('processing events', event.type);
        handelEvents(event.type,event.data)
    }
})