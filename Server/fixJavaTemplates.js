const mongoose = require('mongoose');
const Problem = require('./models/Problem');
require('dotenv').config();

async function fixJavaTemplates() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Get all problems with Java templates
        const problems = await Problem.find({
            'functionTemplates.java': { $exists: true, $ne: '' }
        });

        console.log(`Found ${problems.length} problems with Java templates`);

        let updatedCount = 0;

        for (const problem of problems) {
            const javaTemplate = problem.functionTemplates.java;
            
            // Check if it contains "public class Solution"
            if (javaTemplate.includes('public class Solution')) {
                console.log(`Updating Java template for problem: ${problem.title}`);
                
                // Replace "Solution" with "Main" in the template
                const updatedTemplate = javaTemplate
                    .replace(/public class Solution/g, 'public class Main')
                    .replace(/Solution solution = new Solution\(\);/g, 'Main solution = new Main();');

                // Update the problem
                await Problem.findByIdAndUpdate(
                    problem._id,
                    { 
                        $set: { 
                            'functionTemplates.java': updatedTemplate
                        }
                    },
                    { new: true }
                );

                updatedCount++;
                console.log(`✅ Updated: ${problem.title}`);
            }
        }

        console.log(`\n🎉 Successfully updated ${updatedCount} Java templates`);
        console.log('All Java templates now use "public class Main" instead of "public class Solution"');

    } catch (error) {
        console.error('❌ Error updating Java templates:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the fix
fixJavaTemplates();
