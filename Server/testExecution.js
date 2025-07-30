const axios = require('axios');

// Test the code execution with function templates
const testCodeExecution = async () => {
    const API_URL = 'http://localhost:9000/api/codecollab';
    
    // Test Python Two Sum solution
    const pythonCode = `def two_sum(nums, target):
    """
    Complete this function to solve the problem.
    
    Args:
        nums: List of integers
        target: Target integer
    
    Returns:
        List of integers representing the solution
    """
    # Write your code here
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

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
    result = two_sum(*test_data)
    print(json.dumps(result))`;

    try {
        console.log('Testing Python Two Sum execution...');
        
        const response = await axios.post(`${API_URL}/code/execute`, {
            code: pythonCode,
            language: 'python',
            input: '',
            testCase: {
                input: '[[2,7,11,15], 9]',
                output: '[0,1]'
            }
        });

        console.log('Execution Response:', {
            success: response.data.success,
            output: response.data.output,
            executionTime: response.data.executionTime,
            memory: response.data.memory
        });

        if (response.data.success && response.data.output.includes('[0,1]')) {
            console.log('✅ Python execution test PASSED!');
        } else {
            console.log('❌ Python execution test FAILED!');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
};

// Test JavaScript execution
const testJavaScriptExecution = async () => {
    const API_URL = 'http://localhost:9000/api/codecollab';
    
    const jsCode = `function twoSum(nums, target) {
    /**
     * Complete this function to solve the problem.
     * 
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target integer
     * @returns {number[]} Array representing the solution
     */
    // Write your code here
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
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
        
        const result = twoSum(...testData);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.log(JSON.stringify([]));
    }
});`;

    try {
        console.log('\nTesting JavaScript Two Sum execution...');
        
        const response = await axios.post(`${API_URL}/code/execute`, {
            code: jsCode,
            language: 'javascript',
            input: '',
            testCase: {
                input: '[[2,7,11,15], 9]',
                output: '[0,1]'
            }
        });

        console.log('Execution Response:', {
            success: response.data.success,
            output: response.data.output,
            executionTime: response.data.executionTime,
            memory: response.data.memory
        });

        if (response.data.success && response.data.output.includes('[0,1]')) {
            console.log('✅ JavaScript execution test PASSED!');
        } else {
            console.log('❌ JavaScript execution test FAILED!');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
};

// Run all tests
const runAllTests = async () => {
    console.log('🚀 Starting Function Template Execution Tests...\n');
    
    await testCodeExecution();
    await testJavaScriptExecution();
    
    console.log('\n🎉 All tests completed!');
};

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests();
}

module.exports = { testCodeExecution, testJavaScriptExecution };
