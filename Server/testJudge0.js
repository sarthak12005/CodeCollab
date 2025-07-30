const axios = require('axios');
require('dotenv').config();

// Test Judge0 API integration
const testJudge0Integration = async () => {
    const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
    const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

    console.log('🧪 Testing Judge0 API integration...');
    console.log('API URL:', JUDGE0_API_URL);

    // Check if using RapidAPI or direct API
    const isRapidAPI = JUDGE0_API_URL.includes('rapidapi.com');

    if (isRapidAPI && !JUDGE0_API_KEY) {
        console.log('❌ JUDGE0_API_KEY not found in .env file');
        console.log('Please add your RapidAPI key to the .env file:');
        console.log('JUDGE0_API_KEY=your_rapidapi_key_here');
        console.log('\nOr switch to the free Judge0 API by changing your .env:');
        console.log('JUDGE0_API_URL=https://api.judge0.com');
        return;
    }

    try {
        // Test with a simple Python program
        const pythonCode = `print("Hello from Judge0!")`;
        
        console.log('\n📤 Submitting Python code for execution...');
        
        // Step 1: Submit code
        const headers = {
            'Content-Type': 'application/json'
        };

        // Add RapidAPI headers if using RapidAPI
        if (isRapidAPI) {
            headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
            headers['X-RapidAPI-Key'] = JUDGE0_API_KEY;
        }

        const submissionResponse = await axios.post(`${JUDGE0_API_URL}/submissions`, {
            source_code: pythonCode, // Try without base64 encoding first
            language_id: 71 // Python 3
        }, { headers });

        const token = submissionResponse.data.token;
        console.log('✅ Code submitted successfully. Token:', token);

        // Step 2: Poll for results
        console.log('⏳ Waiting for execution results...');
        let result;
        let attempts = 0;
        const maxAttempts = 10;

        do {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
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
            console.log(`Attempt ${attempts}: Status ${result.status.id} - ${result.status.description}`);
        } while (result.status.id <= 2 && attempts < maxAttempts);

        // Get outputs (handle both base64 and plain text)
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

        console.log('\n📊 Execution Results:');
        console.log('Status:', result.status.description);
        console.log('Output:', stdout || 'No output');
        if (stderr) console.log('Error:', stderr);
        if (compile_output) console.log('Compile Output:', compile_output);
        console.log('Execution Time:', result.time ? `${result.time}s` : 'N/A');
        console.log('Memory Used:', result.memory ? `${result.memory} KB` : 'N/A');

        if (result.status.id === 3 && stdout.includes('Hello from Judge0!')) {
            console.log('\n🎉 Judge0 API integration test PASSED!');
            console.log('✅ Your code execution should now work properly.');
        } else {
            console.log('\n❌ Judge0 API integration test FAILED!');
            console.log('Please check your API key and try again.');
        }

    } catch (error) {
        console.error('\n❌ Error testing Judge0 API:', error.response?.data || error.message);
        
        if (error.response?.status === 401) {
            console.log('\n🔑 Authentication failed. Please check your JUDGE0_API_KEY in the .env file.');
        } else if (error.response?.status === 429) {
            console.log('\n⏰ Rate limit exceeded. Please wait and try again.');
        }
    }
};

// Run the test
testJudge0Integration();
