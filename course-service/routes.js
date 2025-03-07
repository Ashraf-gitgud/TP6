const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Course = require('./models')


router.get('/all', async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/add', async (req, res) => {
    const { titre, professeur, description, prix } = req.body
    try {
        const newCourse = new Course({ titre, professeur, description, prix })
        await newCourse.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const { titre, professeur, description, prix } = req.body
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, { titre, professeur, description, prix }, { new: true })
        res.json(updatedCourse)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        await Course.findByIdAndDelete(id)
        res.json({ message: 'Course deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/search', async (req, res) => {
    const { q } = req.query
    try {
        const courses = await Course.find({ titre: { $regex: q, $options: 'i' } })
        res.json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})