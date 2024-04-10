const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportSchema = new Schema({
   victim: { 
      type: String,
      required: true
   },
   reporter: { 
      type: String,
      required: true
   },
   where: { 
      type: String,
      required: true
   },
   description: { 
      type: String,
      required: true
   },
}, { timestamps: true})

module.exports = mongoose.model('Report', reportSchema)

