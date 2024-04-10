require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const reportRoutes = require('./routes/reports')
const cors = require('cors');
const app = express();


//express app


app.use(cors());

//middleware


app.use(express.json()) // invoca o middleware do json para que o req funcione.
app.use((req, res, next) => {
   console.log(req.path, req.method)   
   next()
})

//routes
app.use( '/' , reportRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URL)
   .then(() => {
      //listen for requests 
      app.listen(process.env.PORT, () => { // esconde a porta no arquivo .env
         console.log('connected to DB & listening on port', process.env.PORT)
      })
   })
   .catch((error) =>{
      console.log(error)
   })




process.env