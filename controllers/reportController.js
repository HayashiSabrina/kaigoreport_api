const Report = require('../models/reportModel')
const mongoose = require('mongoose')

//get all 
const getReports = async (req, res) => {
   try {
      const reports = await Report.find({}).sort({createdAt: -1}).lean() // Adicionando 'lean' para otimizar a consulta no MongoDB

      res.status(200).json(reports)
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}

//get a single 
const getReport = async (req, res) => {
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'Report not found'})
   }

   const report = await Report.findById(id)

   if(!report) {
      return res.status(404).json({error: 'Report not found'})
   }
   res.status(200).json(report)
}


//create a new 

const createReport = async (req, res) => {
   const{ victim, reporter, where, description } = req.body

   let emptyFields = []
   
      if(!victim) {
         emptyFields.push('victim')
      }
      if(!reporter) {
         emptyFields.push('reporter')
      }
      if(!where) {
      emptyFields.push('where')
      }
      if(!description) { 
      emptyFields.push('description')
      }

   if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
   }

   // add to the database
   try {
     const report = await Report.create({ victim, reporter, where, description })
     res.status(200).json(report)
   } catch (error) {
     res.status(400).json({ error: error.message })
   }
}

//delete a report
const deleteReport = async (req, res) => {
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such report'})
   }

   const report = await Report.findOneAndDelete({_id: id}) //moongoose _id

   if(!report) {
      return res.status(404).json({error: 'No such report'})
   }

   res.status(200).json(report)
}


//update a workout

const updateReport = async (req, res) => {
   const {id} = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such report'})
   }

   const report = await Report.findOneAndUpdate({_id: id}, {
      ...req.body

   })
   if(!report) {
      return res.status(404).json({error: 'No such report'})
   }

   res.status(200).json(report)
}

module.exports = {
   getReports,
   getReport,
   createReport,
   deleteReport,
   updateReport
}