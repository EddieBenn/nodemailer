import express from 'express'
import dotenv from 'dotenv'
import {db} from './config/db'
import {HttpError} from 'http-errors';
import logger from 'morgan'
import userRoutes from './routes/userRoutes'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use(cors())
// app.use(express.static(path.join(__dirname, '../public')));
db.sync({}).then( ()=>{
    console.log("Database is connected");
}).catch((err:HttpError)=>{
    console.log(err);
})


app.use('/user', userRoutes)
app.listen(process.env.PORT, ()=>{
    console.log(`App listening on Port ${process.env.PORT}`)
})