const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Student = require('./models')
const axios = require('axios')

router.get('/all', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
    const { nom, email } = req.body
    try {
        const newStudent = new Student({ nom, email })
        await newStudent.save()
        res.status(201).json(newStudent)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/enroll/:student_id/:course_id', async (req, res) => {
    const { student_id, course_id } = req.params
    try {
        const student = await Student.findById(student_id)
        if (!student) return res.status(404).json({ message: 'Student not found' })
        const courses = await axios.get('http://localhost:3001/courses/all')
        const course = courses.data.find(cx => x._id === course_id)
        if (!course) return res.status(404).json({ message: 'Course not found' })
        student.cours.push(course_id)
        await student.save()
        res.json({ message: 'Enrolled successfully', student })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


