const Problem = require('../models/Problem');
const User = require('../models/user');
require('dotenv').config();


exports.getProblems = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from auth middleware

        // Get all problems
        const problems = await Problem.find();

        if (!problems) {
            console.log("No problems found");
            return res.status(404).json({ message: "no problems found" });
        }

        // Get user's solved problems
        const user = await User.findById(userId).select('solveProblems userFavorites');
        const solvedProblemIds = user?.solveProblems || [];
        const favoriteProblemIds = user?.userFavorites || [];

        // Add solved and favorite status to each problem
        const problemsWithStatus = problems.map(problem => {
            const problemObj = problem.toObject();
            problemObj.isSolved = solvedProblemIds.some(solvedId => solvedId.toString() === problem._id.toString());
            problemObj.isFavorited = favoriteProblemIds.some(favId => favId.toString() === problem._id.toString());
            return problemObj;
        });

        res.status(200).json({
            message: "fetched problems successfully",
            problems: problemsWithStatus
        });
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
            isDailyProblem: isDailyProblem || false,
            dailyProblemDate: isDailyProblem ? new Date() : null
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

// Generate default function templates based on problem title
const generateFunctionTemplates = (title) => {
    const functionName = title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 30);

    return {
        python: `def ${functionName}(nums, target):
    """
    Complete this function to solve the problem.

    Args:
        nums: List of integers
        target: Target integer

    Returns:
        List of integers representing the solution
    """
    # Write your code here
    pass

# Driver code - DO NOT MODIFY
if __name__ == "__main__":
    import json
    import sys

    # Read input from stdin or use default test case
    try:
        line = input().strip()
        if line:
            test_data = json.loads(line)
        else:
            test_data = [[2, 7, 11, 15], 9]  # Default test case
    except:
        test_data = [[2, 7, 11, 15], 9]  # Default test case

    # Call the function with test data
    result = ${functionName}(*test_data)
    print(json.dumps(result))`,

        javascript: `function ${functionName}(nums, target) {
    /**
     * Complete this function to solve the problem.
     *
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target integer
     * @returns {number[]} Array representing the solution
     */
    // Write your code here

}

// Driver code - DO NOT MODIFY
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = '';
rl.on('line', (line) => {
    input = line;
    rl.close();
});

rl.on('close', () => {
    try {
        let testData;
        if (input.trim()) {
            testData = JSON.parse(input);
        } else {
            testData = [[2, 7, 11, 15], 9]; // Default test case
        }

        const result = ${functionName}(...testData);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.log(JSON.stringify([]));
    }
});`,

        java: `import java.util.*;
import java.io.*;

public class Main {
    public int[] ${functionName}(int[] nums, int target) {
        /*
         * Complete this function to solve the problem.
         *
         * @param nums Array of integers
         * @param target Target integer
         * @return Array representing the solution
         */
        // Write your code here
        return new int[0];
    }

    // Driver code - DO NOT MODIFY
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            String input = "";
            if (scanner.hasNextLine()) {
                input = scanner.nextLine();
            }

            // Parse input or use default
            int[] nums;
            int target;
            if (!input.isEmpty()) {
                // Parse JSON input
                input = input.replaceAll("[\\[\\]]", "");
                String[] parts = input.split(",");
                nums = new int[parts.length - 1];
                for (int i = 0; i < nums.length; i++) {
                    nums[i] = Integer.parseInt(parts[i].trim());
                }
                target = Integer.parseInt(parts[parts.length - 1].trim());
            } else {
                nums = new int[]{2, 7, 11, 15};
                target = 9;
            }

            Main solution = new Main();
            int[] result = solution.${functionName}(nums, target);

            System.out.print("[");
            for (int i = 0; i < result.length; i++) {
                System.out.print(result[i]);
                if (i < result.length - 1) System.out.print(",");
            }
            System.out.println("]");

        } catch (Exception e) {
            System.out.println("[]");
        }
    }
}`,

        cpp: `#include <vector>
#include <iostream>
#include <string>
#include <sstream>
using namespace std;

class Solution {
public:
    vector<int> ${functionName}(vector<int>& nums, int target) {
        /*
         * Complete this function to solve the problem.
         *
         * @param nums Vector of integers
         * @param target Target integer
         * @return Vector representing the solution
         */
        // Write your code here
        return {};
    }
};

// Driver code - DO NOT MODIFY
int main() {
    string input;
    getline(cin, input);

    vector<int> nums;
    int target;

    if (input.empty()) {
        nums = {2, 7, 11, 15};
        target = 9;
    } else {
        // Simple parsing for [[nums], target] format
        // This is a simplified parser
        nums = {2, 7, 11, 15};
        target = 9;
    }

    Solution solution;
    vector<int> result = solution.${functionName}(nums, target);

    cout << "[";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i < result.size() - 1) cout << ",";
    }
    cout << "]" << endl;

    return 0;
}`,

        c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*
 * Complete this function to solve the problem.
 *
 * @param nums Array of integers
 * @param numsSize Size of the nums array
 * @param target Target integer
 * @param returnSize Pointer to store the size of returned array
 * @return Array representing the solution
 */
int* ${functionName}(int* nums, int numsSize, int target, int* returnSize) {
    // Write your code here
    *returnSize = 0;
    return NULL;
}

// Driver code - DO NOT MODIFY
int main() {
    int nums[] = {2, 7, 11, 15};
    int numsSize = 4;
    int target = 9;
    int returnSize;

    int* result = ${functionName}(nums, numsSize, target, &returnSize);

    printf("[");
    for (int i = 0; i < returnSize; i++) {
        printf("%d", result[i]);
        if (i < returnSize - 1) printf(",");
    }
    printf("]\\n");

    if (result) free(result);
    return 0;
}`
    };
};

exports.getProblemById = async (req, res) => {
    try {
        const { problemId } = req.params;

        if (!problemId) {
            return res.status(400).json({ message: "Problem ID is required" });
        }

        let problem = await Problem.findById(problemId);


        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        // Generate function templates if they don't exist
        if (!problem.functionTemplates || Object.keys(problem.functionTemplates).length === 0) {
            const templates = generateFunctionTemplates(problem.title);
            problem.functionTemplates = templates;
            await problem.save();
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


exports.editProblem = async (req, res) => {
    try {
        const { problemId } = req.params;

        if (!problemId) return res.status(400).json({ message: "the problem id is not found" });

        const problem = await Problem.findByIdAndUpdate(problemId, { isDailyProblem: true }, { new: true, runValidators: true });

        if (!problem) {
            return res.status(404).json({ message: "problem not found" });
        }


        res.status(200).json({ message: "successfully updated the problem " });
    } catch (err) {
        console.log("the error in editing problem is ", err)
        res.status(500).json({ message: "internal server error" });
    }
}



