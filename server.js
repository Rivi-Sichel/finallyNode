import express from "express"
import dotnev from "dotenv"
import cors from "cors"


import tripRouter from './routers/trip.js'
import ordersRouter from './routers/orders.js'
import userRouter from './routers/user.js'
import {connectToDB} from "./config/db.js"


dotnev.config()
const app=express();
connectToDB()
app.use(cors())

app.use(express.json())


app.use('/trip',tripRouter)
app.use('/user',userRouter)
app.use('/orders',ordersRouter)

let port=process.env.PORT

app.listen(port,()=>{
    console.log("app is listening on port "+port)
})