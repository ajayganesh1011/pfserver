require('dotenv').config() 

const express = require('express')
const cors=require('cors')
const router=require('./Router/router')
require('./Connection/db')
const jwt=require('./Middlewares/jwtMiddleware')

const pfServer = express()

pfServer.use(cors())
pfServer.use(express.json())
// pfServer.use(jwt)
pfServer.use(router)

pfServer.use('/uploads', express.static('./uploads'))

const PORT=3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log('Server Running at:',PORT)
})

pfServer.get('/',(req,res)=>{
    res.send('<h1>Request is Hit</h1>')
})