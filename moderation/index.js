import express from 'express'
import axios from 'axios'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

app.post('/events', async (req,res) => {
    const {type,data} = req.body;
    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'Rejected' : 'Approved';
        await axios.post('http://localhost:9000/events',{
            type: 'CommentModerated',
            data:{
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }
    res.status(200).send({})
})

app.listen(8020,()=>{
    console.log('moderation server listining on 8020')
})