const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Teacher = require('./models')
const axios = require('axios')

router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find()
        res.json(teachers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
    const { _id,name, bio } = req.body
    try {
        const newTeacher = new Teacher({ _id, name, bio })
        await newTeacher.save()
        res.status(201).json(newTeacher)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/assign/:teacher_id/:course_id', async (req, res) => {
    const { teacher_id, course_id } = req.params
    try {
        const teacher = await Teacher.findById(teacher_id)
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' })
        const allCourses = await axios.get('http://localhost:3001/course-service/all',{
            headers: { 
                'Authorization': req.headers['authorization'] 
            }})
        const course = allCourses.data.find(c => c._id === course_id)
        if (!course) return res.status(404).json({ message: 'Course not found' })
        teacher.cours.push(course_id)
        await teacher.save()
        res.json({ message: 'Course assigned successfully', teacher })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/enrolledStudents/:course_id', async (req, res) => {
    const { course_id } = req.params
    try {
        const allStudents = await axios.get('http://localhost:3002/student-service/all',{
            headers: { 
                'Authorization': req.headers['authorization'] 
            }})
        const enrolledStudents = []
        allStudents.data.forEach(student => {
            if (student.cours.includes(course_id)) {
                enrolledStudents.push(student)
            }
        })
        res.json(enrolledStudents)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router