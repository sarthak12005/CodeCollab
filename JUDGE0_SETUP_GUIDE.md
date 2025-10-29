# Judge0 API Setup Guide

## Overview
Your CodeCollab application has been updated to use the Judge0 API for code execution instead of local execution. This eliminates the need to install Python, Node.js, Java, GCC, etc. on your machine.

## What Changed
- ✅ Replaced local code execution with Judge0 API calls
- ✅ Added support for multiple programming languages
- ✅ Improved error handling and execution feedback
- ✅ Real execution time and memory usage reporting

## Step 1: Get Judge0 API Key

### Option 1: RapidAPI (Recommended)
1. Go to [RapidAPI Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce/)
2. Click "Subscribe to Test" 
3. Choose a plan:
   - **Basic Plan**: Free - 50 requests/month
   - **Pro Plan**: $5/month - 10,000 requests/month
   - **Ultra Plan**: $15/month - 100,000 requests/month
4. After subscribing, copy your API key from the "X-RapidAPI-Key" header

### Option 2: Direct Judge0 API
1. Go to [Judge0 API](https://api.judge0.com/)
2. Sign up for an account
3. Get your API key from the dashboard

## Step 2: Configure Environment Variables

Add the following to your `Server/.env` file:

```env
# JUDGE0 API Configuration
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your_rapidapi_key_here
```

**Important**: Replace `your_rapidapi_key_here` with your actual API key.

## Step 3: Test the Integration

Run the test script to verify everything works:

```bash
cd Server
node testJudge0.js
```

If successful, you should see:
```
🎉 Judge0 API integration test PASSED!
✅ Your code execution should now work properly.
```

## Step 4: Start Your Server

```bash
cd Server
npm run dev
```

## Supported Languages

The updated system now supports:
- **JavaScript** (Node.js)
- **Python** (Python 3)
- **Java**
- **C++** (GCC 9.2.0)
- **C** (GCC 9.2.0)
- **C#** (Mono 6.6.0.161)
- **Go** (1.13.5)
- **Rust** (1.40.0)
- **PHP** (7.4.1)
- **Ruby** (2.7.0)

## Troubleshooting

### Error: "Judge0 API key not configured"
- Make sure you added `JUDGE0_API_KEY` to your `.env` file

### Error: "Authentication failed"
- Check that your API key is correct
- Ensure you're subscribed to the Judge0 API on RapidAPI

### Error: "Rate limit exceeded"
- You've exceeded your plan's request limit
- Wait for the limit to reset or upgrade your plan

### Error: "Unsupported language"
- Check that the language is in the supported list above
- Make sure you're using the correct language identifier

## Benefits of Judge0 API

1. **No Local Dependencies**: No need to install compilers/interpreters
2. **Consistent Environment**: Same execution environment for all users
3. **Security**: Code runs in isolated containers
4. **Performance**: Fast execution with real metrics
5. **Scalability**: Handles multiple concurrent executions
6. **Multiple Languages**: Support for 10+ programming languages

## API Usage Limits

- **Free Plan**: 50 requests/month
- **Pro Plan**: 10,000 requests/month  
- **Ultra Plan**: 100,000 requests/month

Each code execution counts as one request.

## Next Steps

1. Get your Judge0 API key
2. Add it to your `.env` file
3. Test the integration
4. Start coding and testing!

Your CodeCollab application should now work perfectly without any local compiler/interpreter dependencies.
