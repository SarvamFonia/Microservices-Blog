import express from 'express'
import axios from 'axios'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

const events = []

app.post('/events',(req,res) => {
    const event = req.body

    events.push(event)
    axios.post('http://localhost:8000/events', event)     //Posts
    axios.post('http://localhost:8020/events', event)     //Moderation
    axios.post('http://localhost:8050/events', event)     //Comments
    axios.post('http://localhost:8080/events', event)     //Query
    

    res.send({status: "OK"})
})

app.get('/events', (req,res) => {
    res.status(200).send(events)
})

app.listen(9000,()=>{
    console.log('Event Bus listining on 9000')
})



 