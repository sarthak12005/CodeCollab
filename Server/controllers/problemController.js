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
        const {problemId} = req.body;

        if (!problemId) {
            console.log("the problem id is undefined");
            return res.status(400).json({message: "problem id is undefined"});
        }

        const problem = await Problem.findByIdAndDelete(problemId);

        

    } catch (err) {
        console.log("The error in deleting problem is : ", err);
        res.status(500).json({ message: "Internal Server error", err });
    }
}

exports.editProblem = async (req, res) => {

}