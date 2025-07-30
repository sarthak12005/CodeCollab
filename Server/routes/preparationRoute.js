const express = require('express');
const router = express.Router();
const InterviewQuestion = require('../models/InterviewQuestion');
const AptitudeQuestion = require('../models/AptitudeQuestion');
const CodingQuestion = require('../models/CodingQuestion');

// Interview Questions Routes
// GET /api/preparation/interview - Get all interview questions
router.get('/interview', async (req, res) => {
    try {
        const { company, year, category, difficulty, page = 1, limit = 20 } = req.query;
        
        // Build filter object
        const filter = { isActive: true };
        if (company && company !== 'all') filter.company = company;
        if (year && year !== 'all') filter.year = year;
        if (category && category !== 'all') filter.category = category;
        if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get questions with pagination
        const questions = await InterviewQuestion.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await InterviewQuestion.countDocuments(filter);

        res.json({
            success: true,
            data: questions,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / limit),
                count: questions.length,
                totalQuestions: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching interview questions',
            error: error.message
        });
    }
});

// POST /api/preparation/interview - Add new interview question (Admin only)
router.post('/interview', async (req, res) => {
    try {
        const question = new InterviewQuestion(req.body);
        await question.save();
        
        res.status(201).json({
            success: true,
            message: 'Interview question added successfully',
            data: question
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding interview question',
            error: error.message
        });
    }
});

// Aptitude Questions Routes
// GET /api/preparation/aptitude - Get all aptitude questions
router.get('/aptitude', async (req, res) => {
    try {
        const { topic, difficulty, company, page = 1, limit = 20 } = req.query;
        
        // Build filter object
        const filter = { isActive: true };
        if (topic && topic !== 'all') filter.topic = topic;
        if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
        if (company && company !== 'all') filter.company = company;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get questions with pagination
        const questions = await AptitudeQuestion.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await AptitudeQuestion.countDocuments(filter);

        res.json({
            success: true,
            data: questions,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / limit),
                count: questions.length,
                totalQuestions: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching aptitude questions',
            error: error.message
        });
    }
});

// POST /api/preparation/aptitude - Add new aptitude question (Admin only)
router.post('/aptitude', async (req, res) => {
    try {
        const question = new AptitudeQuestion(req.body);
        await question.save();
        
        res.status(201).json({
            success: true,
            message: 'Aptitude question added successfully',
            data: question
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding aptitude question',
            error: error.message
        });
    }
});

// Coding Questions Routes
// GET /api/preparation/coding - Get all coding questions
router.get('/coding', async (req, res) => {
    try {
        const { difficulty, category, company, page = 1, limit = 20, search } = req.query;
        
        // Build filter object
        const filter = { isActive: true };
        if (difficulty && difficulty !== 'all') filter.difficulty = difficulty;
        if (category && category !== 'all') filter.category = category;
        if (company && company !== 'all') filter.companies = company;
        
        // Add search functionality
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get questions with pagination
        const questions = await CodingQuestion.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await CodingQuestion.countDocuments(filter);

        res.json({
            success: true,
            data: questions,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / limit),
                count: questions.length,
                totalQuestions: total
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching coding questions',
            error: error.message
        });
    }
});

// POST /api/preparation/coding - Add new coding question (Admin only)
router.post('/coding', async (req, res) => {
    try {
        const question = new CodingQuestion(req.body);
        await question.save();
        
        res.status(201).json({
            success: true,
            message: 'Coding question added successfully',
            data: question
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error adding coding question',
            error: error.message
        });
    }
});

// GET /api/preparation/stats - Get preparation statistics
router.get('/stats', async (req, res) => {
    try {
        const [interviewCount, aptitudeCount, codingCount] = await Promise.all([
            InterviewQuestion.countDocuments({ isActive: true }),
            AptitudeQuestion.countDocuments({ isActive: true }),
            CodingQuestion.countDocuments({ isActive: true })
        ]);

        // Get company counts
        const companies = await InterviewQuestion.distinct('company', { isActive: true });
        
        // Get difficulty distribution for coding questions
        const difficultyStats = await CodingQuestion.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$difficulty', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalQuestions: interviewCount + aptitudeCount + codingCount,
                interview: interviewCount,
                aptitude: aptitudeCount,
                coding: codingCount,
                companies: companies.length,
                difficultyDistribution: difficultyStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching preparation statistics',
            error: error.message
        });
    }
});

// GET /api/preparation/companies - Get list of companies
router.get('/companies', async (req, res) => {
    try {
        const companies = await InterviewQuestion.distinct('company', { isActive: true });
        res.json({
            success: true,
            data: companies.sort()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching companies',
            error: error.message
        });
    }
});

module.exports = router;
