const Submission = require('../models/Submission');
const User = require('../models/user');
const Problem = require('../models/Problem');

exports.submitSolution = async (req, res) => {
    try {
        const userId = req.user.id || req.user.userId; // Get user ID from auth middleware
        const username = req.user.username || 'Unknown'; // Get username from auth middleware
        const {problemId, code, language, status, runtime, memory, testCasesPassed, totalTestCases, executionTime, errorMessage} = req.body;

        if (!problemId || !code || !language || !status || testCasesPassed === undefined || totalTestCases === undefined) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
                required: ["problemId", "code", "language", "status", "testCasesPassed", "totalTestCases"]
            });
        }

        const validLanguages = ['javascript', 'python', 'java', 'cpp', 'c'];
        if (!validLanguages.includes(language.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Invalid programming language.",
                validLanguages
            });
        }

        // Create submission record
        const submission = new Submission({
            userId,
            problemId,
            code,
            language: language.toLowerCase(),
            status,
            runtime: runtime || 0,
            memory: memory || 0,
            testCasesPassed,
            totalTestCases,
            executionTime: executionTime || 0,
            errorMessage: errorMessage || null,
            username

        });

        await submission.save();

        // If submission is successful (all test cases passed), update user's solved problems
        if (status === 'Accepted' && testCasesPassed === totalTestCases) {
            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { solveProblems: problemId } }, // $addToSet prevents duplicates
                { new: true }
            );

            // Update problem's solvedBy array
            await Problem.findByIdAndUpdate(
                problemId,
                { $addToSet: { solvedBy: userId } },
                { new: true }
            );
        }

        res.status(201).json({
            success: true,
            message: "Solution submitted successfully.",
            submission,
            allTestsPassed: testCasesPassed === totalTestCases
        });


    } catch (err) {
        console.error("Error in submitting solution:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

// Get all submissions for a specific problem
exports.getProblemSubmissions = async (req, res) => {
    try {
        const { problemId } = req.params;
        const userId = req.user.id;

        if (!problemId) {
            return res.status(400).json({
                success: false,
                message: "Problem ID is required."
            });
        }

        // Get all submissions for this problem, sorted by creation date (newest first)
        const submissions = await Submission.find({ problemId })
            .sort({ createdAt: -1 })
            .limit(50) // Limit to last 50 submissions
            .select('username language status executionTime memory testCasesPassed totalTestCases createdAt');

        // Get user's latest submission for this problem
        const userSubmission = await Submission.findOne({
            problemId,
            userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Submissions retrieved successfully.",
            submissions,
            userSubmission
        });

    } catch (err) {
        console.error("Error in fetching submissions:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
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