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
            mongoose.connect("mongodb+srv://23kundanrajendra:MnRXP5fopDxt4p4j@urbannest.pf1zp.mongodb.net/")
            .then(() => console.log('Connected!'));
            
        } catch (error) {
                 console.log(error)
        }







        app.get('/', (req, res) => {
            res.send('Server is running');
        });




        app.listen(5000 , ()=>{
            console.log("server is runing on port :",5000 );
            
        })