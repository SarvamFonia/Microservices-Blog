import express from 'express'
import cors from 'cors'
import {randomBytes} from 'crypto'
import axios from 'axios'

const app = express()
app.use(express.json())
app.use(cors())


const posts = {}

app.get('/posts', async(req,res) => {
    res.send(posts)
})

app.post('/posts', async(req,res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id,title
    }

    await axios.post('http://localhost:9000/events',{
        type : 'PostCreated',
        data: {
            id,title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req,res) => {
    console.log("Received Events", req.body.type)
    res.send({})
})

app.listen(8000, () => {
    console.log(`POST server listining at PORT 8000`)
})