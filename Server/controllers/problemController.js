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
            isDailyProblem,
            dailyProblemDate
        } = req.body;


        if (!title || !description || !difficulty || !tags || !companies || !acceptanceRate || !constraints || !examples || !testCases || !hints || !solution || !isDailyProblem || !dailyProblemDate) {
            console.log('invalid credentials');
            return res.status(400).json({ message: "missing some credentials" });
        }

        const problem = new Problem({
            title,
            description,
            difficulty,
            tags: tags || [],
            companies: companies || [],
            acceptanceRate: acceptanceRate || 0,
            constraints,
            examples: examples || [],
            testCases: testCases || [],
            hints: hints || [],
            solution,
            isDailyProblem: isDailyProblem || false,
            dailyProblemDate: isDailyProblem ? new Date() : null
        });

        await problem.save();

        res.status(200).json({ message: "The problem saved successfully", problem })

    } catch (err) {
        console.log("The error in adding problem is : ", err);
        res.status(500).json({ message: "Internal Server error", err });
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

exports.editProblem = async (req, res) => {
    try {
        const { problemId } = req.params;

        if (!problemId) return res.status(400).json({ message: "the problem id is not found" });

        const problem = await Problem.findByIdAndUpdate(problemId, { isDailyProblem: true }, { new: true, runValidators: true });

        if (!problem) {
            return res.status(404).json({message: "problem not found"});
        }


        res.status(200).json({message: "successfully updated the problem "});
    } catch (err) {
        console.log("the error in editing problem is ", err) 
        res.status(500).json({message: "internal server error"});
    }
}

