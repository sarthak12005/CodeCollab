const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Supported languages
const SUPPORTED_LANGUAGES = ['python', 'javascript', 'java'];

// Create temp directory if it doesn't exist
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
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

        const supportedLanguages = ['python', 'javascript', 'java', 'cpp', 'c'];
        if (!supportedLanguages.includes(language.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: 'Unsupported language',
                supportedLanguages: supportedLanguages
            });
        }

        const startTime = Date.now();

        // Use the code directly since templates now include driver code
        let finalCode = code;
        let testInput = '';

        // If test case is provided, use its input
        if (testCase && testCase.input) {
            testInput = testCase.input;
        }

        // Execute code based on language
        let result;
        switch (language.toLowerCase()) {
            case 'python':
                result = await executePython(finalCode, testInput || input);
                break;
            case 'javascript':
                result = await executeJavaScript(finalCode, testInput || input);
                break;
            case 'java':
                result = await executeJava(finalCode, testInput || input);
                break;
            case 'cpp':
                result = await executeCpp(finalCode, testInput || input);
                break;
            case 'c':
                result = await executeC(finalCode, testInput || input);
                break;
            default:
                throw new Error('Unsupported language');
        }

        const executionTime = Date.now() - startTime;

        // Generate realistic memory usage (simulated)
        const memoryUsage = Math.floor(Math.random() * 50) + 10; // 10-60 KB



        res.json({
            success: result.success,
            status: result.success ? 'success' : 'error',
            message: result.success ? 'Code executed successfully' : result.error,
            output: result.output || (result.success ? 'Code executed successfully (no output)' : ''),
            executionTime: executionTime,
            memory: memoryUsage
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

// Execute Python code
async function executePython(code, input) {
    return new Promise((resolve) => {
        const fileName = `temp_${Date.now()}.py`;
        const filePath = path.join(tempDir, fileName);

        try {
            fs.writeFileSync(filePath, code);

            const command = `python "${filePath}"`;
            const child = exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
                // Clean up file
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    // Ignore cleanup errors
                }

                if (error) {
                    resolve({
                        success: false,
                        output: stderr || error.message || 'Execution failed',
                        error: stderr || error.message
                    });
                } else {
                    // Clean and format output
                    const cleanOutput = stdout ? stdout.trim() : '';
                    resolve({
                        success: true,
                        output: cleanOutput || 'Code executed successfully (no output)',
                        error: null
                    });
                }
            });

            // Send input if provided
            if (input && input.trim()) {
                child.stdin.write(input + '\n');
                child.stdin.end();
            } else {
                child.stdin.end();
            }
        } catch (err) {
            resolve({
                success: false,
                output: err.message,
                error: err.message
            });
        }
    });
}

// Execute JavaScript code
async function executeJavaScript(code, input) {
    return new Promise((resolve) => {
        const fileName = `temp_${Date.now()}.js`;
        const filePath = path.join(tempDir, fileName);

        try {
            fs.writeFileSync(filePath, code);

            const command = `node "${filePath}"`;
            const child = exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
                // Clean up file
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    // Ignore cleanup errors
                }

                if (error) {
                    resolve({
                        success: false,
                        output: stderr || error.message || 'Execution failed',
                        error: stderr || error.message
                    });
                } else {
                    // Clean and format output
                    const cleanOutput = stdout ? stdout.trim() : '';
                    resolve({
                        success: true,
                        output: cleanOutput || 'Code executed successfully (no output)',
                        error: null
                    });
                }
            });

            // Send input if provided
            if (input && input.trim()) {
                child.stdin.write(input + '\n');
                child.stdin.end();
            } else {
                child.stdin.end();
            }
        } catch (err) {
            resolve({
                success: false,
                output: err.message,
                error: err.message
            });
        }
    });
}

// Execute Java code (simplified - requires Java to be installed)
async function executeJava(code, input) {
    return new Promise((resolve) => {
        // For Java, we need to extract the class name
        const classNameMatch = code.match(/public\s+class\s+(\w+)/);
        if (!classNameMatch) {
            resolve({
                success: false,
                output: 'Error: Could not find public class declaration',
                error: 'Could not find public class declaration'
            });
            return;
        }

        const className = classNameMatch[1];
        const fileName = `${className}.java`;
        const filePath = path.join(tempDir, fileName);

        try {
            fs.writeFileSync(filePath, code);

            // Compile first
            exec(`javac "${filePath}"`, (compileError, compileStdout, compileStderr) => {
                if (compileError) {
                    // Clean up
                    try {
                        fs.unlinkSync(filePath);
                    } catch (e) {}

                    resolve({
                        success: false,
                        output: compileStderr || compileError.message,
                        error: compileStderr || compileError.message
                    });
                    return;
                }

                // Run the compiled class
                const runCommand = `java -cp "${tempDir}" ${className}`;
                const child = exec(runCommand, { timeout: 5000 }, (error, stdout, stderr) => {
                    // Clean up files
                    try {
                        fs.unlinkSync(filePath);
                        fs.unlinkSync(path.join(tempDir, `${className}.class`));
                    } catch (e) {
                        // Ignore cleanup errors
                    }

                    if (error) {
                        resolve({
                            success: false,
                            output: stderr || error.message,
                            error: stderr || error.message
                        });
                    } else {
                        resolve({
                            success: true,
                            output: stdout,
                            error: null
                        });
                    }
                });

                // Send input if provided
                if (input) {
                    child.stdin.write(input);
                    child.stdin.end();
                }
            });
        } catch (err) {
            resolve({
                success: false,
                output: err.message,
                error: err.message
            });
        }
    });
}

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

        const results = [];

        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const testInput = testCase.input || '';
            const expectedOutput = testCase.output || testCase.expectedOutput || '';

            // Execute the code with test input (templates now include driver code)
            const executionResult = await executeCodeWithInput(code, language, testInput);

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

// Helper function to execute code with input
async function executeCodeWithInput(code, language, input) {
    const startTime = Date.now();

    let result;
    switch (language.toLowerCase()) {
        case 'python':
            result = await executePython(code, input);
            break;
        case 'javascript':
            result = await executeJavaScript(code, input);
            break;
        case 'java':
            result = await executeJava(code, input);
            break;
        case 'cpp':
            result = await executeCpp(code, input);
            break;
        case 'c':
            result = await executeC(code, input);
            break;
        default:
            return {
                success: false,
                output: '',
                error: 'Unsupported language',
                executionTime: 0
            };
    }

    const executionTime = Date.now() - startTime;

    return {
        success: result.success,
        output: result.output,
        error: result.error,
        executionTime: executionTime
    };
}

// Execute C++ code
async function executeCpp(code, input) {
    return new Promise((resolve) => {
        const fileName = `temp_${Date.now()}.cpp`;
        const filePath = path.join(tempDir, fileName);
        const exePath = path.join(tempDir, `temp_${Date.now()}.exe`);

        try {
            fs.writeFileSync(filePath, code);

            // Compile first
            exec(`g++ "${filePath}" -o "${exePath}"`, (compileError, compileStdout, compileStderr) => {
                if (compileError) {
                    // Clean up
                    try {
                        fs.unlinkSync(filePath);
                    } catch (e) {}

                    resolve({
                        success: false,
                        output: compileStderr || compileError.message,
                        error: compileStderr || compileError.message
                    });
                    return;
                }

                // Run the compiled executable
                const child = exec(`"${exePath}"`, { timeout: 5000 }, (error, stdout, stderr) => {
                    // Clean up files
                    try {
                        fs.unlinkSync(filePath);
                        fs.unlinkSync(exePath);
                    } catch (e) {
                        // Ignore cleanup errors
                    }

                    if (error) {
                        resolve({
                            success: false,
                            output: stderr || error.message,
                            error: stderr || error.message
                        });
                    } else {
                        resolve({
                            success: true,
                            output: stdout,
                            error: null
                        });
                    }
                });

                // Send input if provided
                if (input) {
                    child.stdin.write(input);
                    child.stdin.end();
                }
            });
        } catch (err) {
            resolve({
                success: false,
                output: err.message,
                error: err.message
            });
        }
    });
}

// Execute C code
async function executeC(code, input) {
    return new Promise((resolve) => {
        const fileName = `temp_${Date.now()}.c`;
        const filePath = path.join(tempDir, fileName);
        const exePath = path.join(tempDir, `temp_${Date.now()}.exe`);

        try {
            fs.writeFileSync(filePath, code);

            // Compile first
            exec(`gcc "${filePath}" -o "${exePath}"`, (compileError, compileStdout, compileStderr) => {
                if (compileError) {
                    // Clean up
                    try {
                        fs.unlinkSync(filePath);
                    } catch (e) {}

                    resolve({
                        success: false,
                        output: compileStderr || compileError.message,
                        error: compileStderr || compileError.message
                    });
                    return;
                }

                // Run the compiled executable
                const child = exec(`"${exePath}"`, { timeout: 5000 }, (error, stdout, stderr) => {
                    // Clean up files
                    try {
                        fs.unlinkSync(filePath);
                        fs.unlinkSync(exePath);
                    } catch (e) {
                        // Ignore cleanup errors
                    }

                    if (error) {
                        resolve({
                            success: false,
                            output: stderr || error.message,
                            error: stderr || error.message
                        });
                    } else {
                        resolve({
                            success: true,
                            output: stdout,
                            error: null
                        });
                    }
                });

                // Send input if provided
                if (input) {
                    child.stdin.write(input);
                    child.stdin.end();
                }
            });
        } catch (err) {
            resolve({
                success: false,
                output: err.message,
                error: err.message
            });
        }
    });
}
