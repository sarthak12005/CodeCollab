const axios = require('axios');
require('dotenv').config();

// Judge0 API Configuration
const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Language ID mapping for Judge0 API
const LANGUAGE_IDS = {
    'javascript': 63, // Node.js
    'python': 71,     // Python 3
    'java': 62,       // Java
    'cpp': 54,        // C++ (GCC 9.2.0)
    'c': 50,          // C (GCC 9.2.0)
    'csharp': 51,     // C# (Mono 6.6.0.161)
    'go': 60,         // Go (1.13.5)
    'rust': 73,       // Rust (1.40.0)
    'php': 68,        // PHP (7.4.1)
    'ruby': 72        // Ruby (2.7.0)
};

// Supported languages
const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_IDS);



// Helper function to execute code using Judge0 API
async function executeWithJudge0(code, languageId, input = '') {
    try {
        // Check if using RapidAPI or direct API
        const isRapidAPI = JUDGE0_API_URL.includes('rapidapi.com');

        // Prepare headers
        const headers = {
            'Content-Type': 'application/json'
        };

        // Add RapidAPI headers if using RapidAPI
        if (isRapidAPI) {
            headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
            headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
        }

        // Step 1: Submit code for execution
        const submissionData = {
            source_code: code, // Try without base64 encoding first
            language_id: languageId
        };

        // Only add stdin if input is provided
        if (input && input.trim()) {
            submissionData.stdin = input; // Try without base64 encoding first
        }

        const submissionResponse = await axios.post(`${JUDGE0_API_URL}/submissions`, submissionData, { headers });

        const token = submissionResponse.data.token;

        // Step 2: Poll for results
        let result;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

            const getHeaders = {};
            if (isRapidAPI) {
                getHeaders['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
                getHeaders['X-RapidAPI-Key'] = JUDGE0_API_KEY;
            }

            const resultResponse = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`, {
                headers: getHeaders
            });

            result = resultResponse.data;
            attempts++;
        } while (result.status.id <= 2 && attempts < maxAttempts); // Status 1-2 means processing

        // Get outputs (try both base64 and plain text)
        const stdout = result.stdout ?
            (typeof result.stdout === 'string' && result.stdout.length > 0 ?
                (result.stdout.match(/^[A-Za-z0-9+/]*={0,2}$/) ?
                    Buffer.from(result.stdout, 'base64').toString() : result.stdout) : '') : '';
        const stderr = result.stderr ?
            (typeof result.stderr === 'string' && result.stderr.length > 0 ?
                (result.stderr.match(/^[A-Za-z0-9+/]*={0,2}$/) ?
                    Buffer.from(result.stderr, 'base64').toString() : result.stderr) : '') : '';
        const compile_output = result.compile_output ?
            (typeof result.compile_output === 'string' && result.compile_output.length > 0 ?
                (result.compile_output.match(/^[A-Za-z0-9+/]*={0,2}$/) ?
                    Buffer.from(result.compile_output, 'base64').toString() : result.compile_output) : '') : '';

        return {
            success: result.status.id === 3, // Status 3 means accepted
            output: stdout || stderr || compile_output || 'No output',
            error: result.status.id !== 3 ? (stderr || compile_output || result.status.description) : null,
            executionTime: parseFloat(result.time) * 1000 || 0, // Convert to milliseconds
            memory: parseFloat(result.memory) || 0,
            status: result.status
        };

    } catch (error) {
        console.error('Judge0 API Error:', error.response?.data || error.message);
        return {
            success: false,
            output: '',
            error: error.response?.data?.message || error.message || 'Execution failed',
            executionTime: 0,
            memory: 0
        };
    }
}

exports.executeCode = async (req, res) => {
    try {
        const { code, language, input = '', testCase } = req.body;

        if (!code || !language) {
            return res.status(400).json({
                success: false,
                message: 'Code and language are required'
            });
        }

        if (!SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Unsupported language',
                supportedLanguages: SUPPORTED_LANGUAGES
            });
        }

        if (!JUDGE0_API_KEY) {
            return res.status(500).json({
                success: false,
                message: 'Judge0 API key not configured'
            });
        }

        const languageId = LANGUAGE_IDS[language.toLowerCase()];
        let testInput = input;

        // If test case is provided, use its input
        if (testCase && testCase.input) {
            testInput = testCase.input;
        }

        // Execute code using Judge0 API
        const result = await executeWithJudge0(code, languageId, testInput);

        res.json({
            success: result.success,
            status: result.success ? 'success' : 'error',
            message: result.success ? 'Code executed successfully' : result.error,
            output: result.output || (result.success ? 'Code executed successfully (no output)' : ''),
            executionTime: result.executionTime,
            memory: result.memory
        });

    } catch (error) {
        console.error('Code execution error:', error);
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};




// Test code execution with sample inputs
exports.testCode = async (req, res) => {
    try {
        const { code, language, testCases } = req.body;

        if (!code || !language || !testCases || !Array.isArray(testCases)) {
            return res.status(400).json({
                success: false,
                message: 'Code, language, and testCases array are required'
            });
        }

        if (!SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Unsupported language',
                supportedLanguages: SUPPORTED_LANGUAGES
            });
        }

        if (!JUDGE0_API_KEY) {
            return res.status(500).json({
                success: false,
                message: 'Judge0 API key not configured'
            });
        }

        const languageId = LANGUAGE_IDS[language.toLowerCase()];
        const results = [];

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const testInput = testCase.input || '';
            const expectedOutput = testCase.output || testCase.expectedOutput || '';

            // Execute the code with test input using Judge0 API
            const executionResult = await executeWithJudge0(code, languageId, testInput);

            // Parse the actual output
            let actualOutput = '';
            if (executionResult.success && executionResult.output) {
                actualOutput = executionResult.output.trim();

                // Try to parse JSON output and normalize
                try {
                    const parsed = JSON.parse(actualOutput);
                    actualOutput = JSON.stringify(parsed);
                } catch (e) {
                    // Keep original output if not JSON
                }
            }

            const expected = expectedOutput.trim();
            let normalizedExpected = expected;
            try {
                const parsed = JSON.parse(expected);
                normalizedExpected = JSON.stringify(parsed);
            } catch (e) {
                // Keep original if not JSON
            }

            const passed = executionResult.success && actualOutput === normalizedExpected;

            results.push({
                testCase: i + 1,
                input: testInput,
                expected: normalizedExpected,
                actual: actualOutput,
                passed,
                executionTime: executionResult.executionTime || 0,
                error: executionResult.success ? null : executionResult.error
            });
        }

        const allPassed = results.every(result => result.passed);

        res.json({
            success: true,
            allTestsPassed: allPassed,
            results,
            summary: {
                total: results.length,
                passed: results.filter(r => r.passed).length,
                failed: results.filter(r => !r.passed).length
            }
        });

    } catch (error) {
        console.error('Test execution error:', error);
        res.status(500).json({
            success: false,
            message: 'Test execution failed',
            error: error.message
        });
    }
};




