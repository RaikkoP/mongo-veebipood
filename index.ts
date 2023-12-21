import express, {Response, Request, Express} from "express";
import cors from "cors";
import mongoose from 'mongoose';
import userController from './controllers/userController'

mongoose.connect("mongodb+srv://riggur:riggur123@kool.pmmlais.mongodb.net/");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log("Connected")
});


const app: Express = express();
app.use(cors());
app.use('/', userController);


app.listen(3000, () => {
    console.log("API on 3000")
})