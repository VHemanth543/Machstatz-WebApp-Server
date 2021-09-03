const express = require('express');

const body = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const addcustomer = require('./model/addcustomer')

const app = express();

const dbUrl = 'mongodb+srv://Vhemanth:SrinivasulU@cluster0.w5rm5.mongodb.net/MachatatzData?retryWrites=true&w=majority'

mongoose.connect(dbUrl, {useNewUrlParser : true , useUnifiedTopology : true})
.then((res)=> console.log("Server connected"))
.catch((err)=> console.log("error" + err))

app.use(cors());

app.use(express.urlencoded({extended : true}));
app.use(body.json());

app.get('/get', async (req , res) => {
    const users = await addcustomer.find({});
    res.json({
        length : users.length,
        users : users
    });
})

app.post('/add', async (req , res) => {
   const  {firstName , lastName , email , password , userName} = req.body;

  addcustomer.findOne({email : email}).then( data => {
      if( data){
          res.json({
              code : 201,
              message : 'User alredy exist with Email Id',
              status : 'Error'
          })
      }
      else {
          const User = new addcustomer({
              firstName : firstName,
              lastName : lastName,
              email : email,
              password : password,
              userName : userName
          });
          User.save().then(data => {
              res.json({
                  code : 220,
                  message : "New user created",
                  status : 'Success'
              })              
              
          })

          
      }
  })

})

app.delete('/delete', async (req,res)=>{
    const {email} = req.body
   
    const deleted = addcustomer.findOneAndDelete({email : email}, (err)=>{
       if(err){
           res.json({
               code : 404,
               status : "Error",
               message : "some error occured",
               error : err
           })
       }
       else{
           res.json({
               code : 220,
               status : "success",
               message : "User accout deleted successfully",
               
           })
       }
   }) 
})

app.listen(8000);