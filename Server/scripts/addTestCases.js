const mongoose = require('mongoose');
const Problem = require('../models/Problem');
require('dotenv').config();

// Sample test cases for different types of problems
const sampleTestCases = [
    // Two Sum type problems
    {
        input: '[2,7,11,15]\n9',
        output: '[0,1]'
    },
    {
        input: '[3,2,4]\n6',
        output: '[1,2]'
    },
    {
        input: '[3,3]\n6',
        output: '[0,1]'
    },
    {
        input: '[1,2,3,4,5]\n9',
        output: '[3,4]'
    },
    {
        input: '[5,5,5,5]\n10',
        output: '[0,1]'
    },
    {
        input: '[1,3,5,7,9]\n12',
        output: '[2,4]'
    },
    {
        input: '[10,20,30,40]\n50',
        output: '[1,2]'
    },
    {
        input: '[1,1,1,1]\n2',
        output: '[0,1]'
    },
    {
        input: '[0,4,3,0]\n0',
        output: '[0,3]'
    },
    {
        input: '[-1,-2,-3,-4,-5]\n-8',
        output: '[2,4]'
    }
];

async function addTestCasesToProblems() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Get all problems that don't have test cases
        const problems = await Problem.find({
            $or: [
                { testCases: { $exists: false } },
                { testCases: { $size: 0 } }
            ]
        });

        console.log(`Found ${problems.length} problems without test cases`);

        // Update each problem with sample test cases
        for (const problem of problems) {
            await Problem.findByIdAndUpdate(
                problem._id,
                { 
                    $set: { 
                        testCases: sampleTestCases 
                    }
                },
                { new: true }
            );
            console.log(`Added test cases to problem: ${problem.title}`);
        }

        console.log('Successfully added test cases to all problems');
        
    } catch (error) {
        console.error('Error adding test cases:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the script
addTestCasesToProblems();
