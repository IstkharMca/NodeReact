/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const express = require('express');
const path = require('path');
const app= express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

const host = process.env.BASE_URL || `http://localhost:${port}`;

app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//CORS 
// app.use((req,res,next)=> {
//    res.header('Access-Control-Allow-Origin','*');
//    res.header(
//        "Access-Control-Allow-Headers",
//        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//    );
//    if(req.method == 'OPTIONS') {
//        res.header('Access-Control-Allow-Methods', 'PUT','GET','POST','DELETE');
//    }
// });

// Import routes handling 

const Post = require('./routes/post');
const Users = require('./routes/User');
const Category = require('./routes/Category');
const Product = require('./routes/Product');
const Cart = require('./routes/Cart');

// Import dataBase Connections
const { dbcconection } = require('./connection');


app.use(express.static(path.join(__dirname,'public')));
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/api/post/',Post);
app.use('/api/users/',Users);
app.use('/api/categories',Category)
app.use('/api/products',Product);
app.use('/api/cart',Cart);


// Error Handling if Error occured 
app.use((req, res ,next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});


app.use((error, req, res, next) => {
     res.status(error.status || 500);
     res.json({
         error : {
             message : error.message
         }
     })
});


app.listen(port,() => console.log('server started - '+host));

