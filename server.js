require('dotenv').config()
const  express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./router/user")
const cors = require('cors');

const bodyParser = require('body-parser');
const propertyRouter = require("./router/Property")
const multer = require("multer");
//const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("./utils/cloudinary");



app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api" , userRouter); 
app.use("/properties" ,propertyRouter);

        try {
            mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log('Connected!'));
            
        } catch (error) {
                 console.log(error)
        }







        app.get('/', (req, res) => {
            res.send('Server is running');
        });




        app.listen(process.env.PORT , ()=>{
            console.log("server is runing on port :",process.env.PORT );
            
        })