const Problem = require('../models/Problem');
require('dotenv').config();


exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();

        if (!problems) {
            return res.status(404).json({ message: "no problems found" });
        }

        res.status(200).json({ message: "fetched problems successfully" });
    } catch (err) {
        console.log("The error in getting all problems is: ", err);
        res.status(500).json({ message: "internal server error", err });
    }
}

exports.addProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            tags,
            companies,
            acceptanceRate,
            constraints,
            examples,
            testCases,
            hints,
            solution,
            isDailyProblem = false, // default value
            dailyProblemDate
        } = req.body;

        // Required fields validation
        if (!title || !description || !difficulty || !tags || !testCases || !solution) {
            return res.status(400).json({
                message: "Missing required fields",
                required: ["title", "description", "difficulty", "tags", "testCases", "solution"]
            });
        }

        // Validate difficulty
        const validDifficulties = ['Easy', 'Medium', 'Hard'];
        if (!validDifficulties.includes(difficulty)) {
            return res.status(400).json({
                message: "Invalid difficulty level",
                validDifficulties
            });
        }

        // Validate tags and companies are arrays if provided
        if (tags && !Array.isArray(tags)) {
            return res.status(400).json({ message: "Tags must be an array" });
        }

        if (companies && !Array.isArray(companies)) {
            return res.status(400).json({ message: "Companies must be an array" });
        }

        // Validate test cases structure
        if (testCases && !Array.isArray(testCases)) {
            return res.status(400).json({ message: "Test cases must be an array" });
        }

        const problem = new Problem({
            title,
            description,
            difficulty,
            tags,
            companies: companies || [],
            acceptanceRate: acceptanceRate || 0,
            constraints: constraints || [],
            examples: examples || [],
            testCases: testCases || [],
            hints: hints || [],
            solution,
            isDailyProblem,
            dailyProblemDate: isDailyProblem ? dailyProblemDate : null
        });

        await problem.save();

        // 201 for resource creation
        res.status(201).json({
            message: "Problem saved successfully",
            problem
        });

    } catch (err) {
        console.error("Error in adding problem:", err);

        // Handle duplicate title error
        if (err.code === 11000 && err.keyPattern?.title) {
            return res.status(400).json({
                message: "Problem with this title already exists"
            });
        }

        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
}

exports.deleteProblem = async (req, res) => {
    try {
        const { problemId } = req.body;

        if (!problemId) {
            console.log("the problem id is undefined");
            return res.status(400).json({ message: "problem id is undefined" });
        }

        const problem = await Problem.findByIdAndDelete(problemId);



    } catch (err) {
        console.log("The error in deleting problem is : ", err);
        res.status(500).json({ message: "Internal Server error", err });
    }
}

exports.getProblemById = async (req, res) => {
    try {
        const {problemId} = req.params;

        if (!problemId) {
            return res.status(400).json({ message: "Problem ID is required" });
        }

        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json({
            message: "Problem fetched successfully",
            problem
        });
    } catch (err) {
        console.error("Error in fetching problem by ID:", err);
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
}

