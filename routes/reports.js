const express = require('express')
const {
   getReports,
   getReport,
   createReport,
   deleteReport,
   updateReport
} = require('../controllers/reportController')

const router = express.Router()

//get all workouts

router.get( '/', getReports)

//GET a single workout - obs: o res só funciona se for invocado o midleware do json
router.get( '/:id', getReport)

// POST a new workout
router.post( '/', createReport) // para funcionar precisa exportar para o controller aula 6

// DELETE a new workout
router.delete('/:id', deleteReport)

// UPDATE a new workout
router.patch('/:id', updateReport)

module.exports = router