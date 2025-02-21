require('dotenv').config()
const  express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./router/user")
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


 app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api" , userRouter); 

        try {
            mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Connected!'));
            
        } catch (error) {
                 console.log(error)
        }



        app.listen(process.env.PORT , ()=>{
            console.log("server is runing on port :",process.env.PORT );
            
        })