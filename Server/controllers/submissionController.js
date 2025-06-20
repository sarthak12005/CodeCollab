const Submission = require('../models/Submission');

exports.submitSolution = async (req, res) => {
    try {
        const {userId, problemId, code, language, status, runtime, memory, testCasesPassed, errorMessage} = req.body;

        if (!userId || !problemId || !code || !language || !status || testCasesPassed === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const validLanguages = ['JavaScript', 'Python', 'Java', 'C++'];
        if (!validLanguages.includes(language)) {
            return res.status(400).json({ message: "Invalid programming language.", validLanguages });
        }

        const submission = new Submission({
            userId, 
            problemId, 
            code,
            language,
            status,
            runtime: runtime || 0,
            memory: memory || 0,
            testCasesPassed,
            errorMessage: errorMessage || null

        });

        await submission.save();
        res.status(201).json({ message: "Solution submitted successfully.", submission });


    } catch (err) {
        console.error("Error in submitting solution:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

exports.getUSerSubmissions = async (req, res) => {
    try {

        const {problemId, userId} = req.query;

        if (!problemId || !userId) {
            return res.status(400).json({ message: "Problem ID and User ID are required." });
        }

        const submissions = await Submission.find({problemId, userId});

        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ message: "No submissions found for this problem." });
        }

        res.status(200).json({ message: "Submissions retrieved successfully.", submissions });

    } catch (err) {
        console.error("Error in fetching submissions:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}

exports.getAllSubmissions = async (req, res) => {
    try {

        const submissions = await Submission.find().populate('userId', 'username').populate('problemId', 'title');
        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ message: "No submissions found." });
        }

        res.status(200).json({ message: "All submissions retrieved successfully.", submissions });

    } catch (err) {
        console.error("Error in fetching all submissions:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
}