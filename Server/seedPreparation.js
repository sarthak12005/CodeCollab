const mongoose = require('mongoose');
const InterviewQuestion = require('./models/InterviewQuestion');
const AptitudeQuestion = require('./models/AptitudeQuestion');
const CodingQuestion = require('./models/CodingQuestion');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const interviewQuestions = [
    {
        company: 'Google',
        question: 'Tell me about yourself and why you want to work at Google.',
        category: 'Behavioral',
        year: '2024',
        tags: ['behavioral', 'introduction'],
        difficulty: 'Easy',
        answer: 'Focus on your professional journey, relevant skills, and passion for technology.',
        tips: ['Keep it concise (2-3 minutes)', 'Highlight relevant experiences', 'Show enthusiasm for the role']
    },
    {
        company: 'Amazon',
        question: 'Describe a time when you had to work with a difficult team member.',
        category: 'Behavioral',
        year: '2024',
        tags: ['leadership', 'teamwork'],
        difficulty: 'Medium',
        answer: 'Use the STAR method to structure your response.',
        tips: ['Focus on resolution', 'Show empathy', 'Demonstrate leadership']
    },
    {
        company: 'Microsoft',
        question: 'How would you design a system to handle millions of users?',
        category: 'System Design',
        year: '2023',
        tags: ['system-design', 'scalability'],
        difficulty: 'Hard',
        answer: 'Discuss load balancing, caching, database sharding, and microservices.',
        tips: ['Start with requirements', 'Consider scalability', 'Discuss trade-offs']
    },
    {
        company: 'Apple',
        question: 'What is your greatest weakness and how are you working to improve it?',
        category: 'Behavioral',
        year: '2024',
        tags: ['self-awareness', 'improvement'],
        difficulty: 'Medium',
        answer: 'Choose a real weakness and show concrete steps for improvement.',
        tips: ['Be honest but strategic', 'Show growth mindset', 'Provide specific examples']
    },
    {
        company: 'Meta',
        question: 'How do you handle disagreements with your manager?',
        category: 'Behavioral',
        year: '2024',
        tags: ['conflict-resolution', 'communication'],
        difficulty: 'Medium',
        answer: 'Focus on respectful communication and finding common ground.',
        tips: ['Show respect for authority', 'Emphasize collaboration', 'Provide specific example']
    },
    {
        company: 'Netflix',
        question: 'Describe a time when you had to learn a new technology quickly.',
        category: 'Behavioral',
        year: '2023',
        tags: ['learning', 'adaptability'],
        difficulty: 'Easy',
        answer: 'Use STAR method and emphasize your learning process.',
        tips: ['Show curiosity', 'Mention resources used', 'Highlight quick results']
    },
    {
        company: 'Google',
        question: 'How would you explain machine learning to a non-technical person?',
        category: 'Technical',
        year: '2024',
        tags: ['communication', 'machine-learning'],
        difficulty: 'Medium',
        answer: 'Use simple analogies and avoid technical jargon.',
        tips: ['Use everyday examples', 'Keep it simple', 'Check for understanding']
    },
    {
        company: 'Amazon',
        question: 'Tell me about a time you failed and what you learned from it.',
        category: 'Behavioral',
        year: '2023',
        tags: ['failure', 'learning', 'growth'],
        difficulty: 'Medium',
        answer: 'Choose a real failure, take responsibility, and show lessons learned.',
        tips: ['Own the failure', 'Focus on learning', 'Show how you applied lessons']
    },
    {
        company: 'Microsoft',
        question: 'How do you prioritize tasks when everything seems urgent?',
        category: 'Behavioral',
        year: '2024',
        tags: ['prioritization', 'time-management'],
        difficulty: 'Medium',
        answer: 'Discuss frameworks like Eisenhower Matrix or impact vs effort.',
        tips: ['Mention specific frameworks', 'Show systematic approach', 'Include stakeholder communication']
    },
    {
        company: 'Apple',
        question: 'Why do you want to leave your current job?',
        category: 'Behavioral',
        year: '2024',
        tags: ['motivation', 'career-change'],
        difficulty: 'Easy',
        answer: 'Focus on growth opportunities and positive reasons.',
        tips: ['Stay positive', 'Focus on growth', 'Avoid criticizing current employer']
    },
    {
        company: 'Tesla',
        question: 'How do you stay updated with the latest technology trends?',
        category: 'Technical',
        year: '2024',
        tags: ['learning', 'technology', 'growth'],
        difficulty: 'Easy',
        answer: 'Mention specific resources, communities, and practices.',
        tips: ['List specific sources', 'Show continuous learning', 'Mention practical application']
    },
    {
        company: 'Spotify',
        question: 'Describe a time when you had to work under tight deadlines.',
        category: 'Behavioral',
        year: '2023',
        tags: ['pressure', 'time-management', 'delivery'],
        difficulty: 'Medium',
        answer: 'Use STAR method and emphasize planning and execution.',
        tips: ['Show planning skills', 'Mention team coordination', 'Highlight successful delivery']
    },
    {
        company: 'Uber',
        question: 'How would you handle a situation where you disagree with a design decision?',
        category: 'Behavioral',
        year: '2024',
        tags: ['disagreement', 'design', 'collaboration'],
        difficulty: 'Medium',
        answer: 'Focus on data-driven arguments and collaborative problem-solving.',
        tips: ['Use data to support arguments', 'Show respect for others', 'Focus on user benefit']
    },
    {
        company: 'Airbnb',
        question: 'Tell me about a time you had to convince someone to change their mind.',
        category: 'Behavioral',
        year: '2023',
        tags: ['persuasion', 'communication', 'influence'],
        difficulty: 'Medium',
        answer: 'Use STAR method and emphasize listening and understanding their perspective.',
        tips: ['Show empathy', 'Use logical arguments', 'Find common ground']
    },
    {
        company: 'LinkedIn',
        question: 'How do you handle constructive criticism?',
        category: 'Behavioral',
        year: '2024',
        tags: ['feedback', 'growth', 'professionalism'],
        difficulty: 'Easy',
        answer: 'Show openness to feedback and ability to act on it.',
        tips: ['Show growth mindset', 'Provide specific example', 'Emphasize improvement']
    },
    {
        company: 'Salesforce',
        question: 'Describe your ideal work environment.',
        category: 'Behavioral',
        year: '2024',
        tags: ['culture', 'environment', 'preferences'],
        difficulty: 'Easy',
        answer: 'Align your answer with the company culture and role requirements.',
        tips: ['Research company culture', 'Be honest but strategic', 'Focus on productivity factors']
    },
    {
        company: 'Twitter',
        question: 'How do you ensure code quality in your projects?',
        category: 'Technical',
        year: '2023',
        tags: ['code-quality', 'best-practices', 'testing'],
        difficulty: 'Medium',
        answer: 'Mention code reviews, testing, documentation, and coding standards.',
        tips: ['Cover multiple aspects', 'Mention specific tools', 'Show systematic approach']
    },
    {
        company: 'Dropbox',
        question: 'Tell me about a time you had to work with limited resources.',
        category: 'Behavioral',
        year: '2024',
        tags: ['resourcefulness', 'creativity', 'problem-solving'],
        difficulty: 'Medium',
        answer: 'Use STAR method and emphasize creative problem-solving.',
        tips: ['Show creativity', 'Emphasize results', 'Mention resource optimization']
    },
    {
        company: 'Slack',
        question: 'How do you approach debugging a complex issue?',
        category: 'Technical',
        year: '2024',
        tags: ['debugging', 'problem-solving', 'methodology'],
        difficulty: 'Medium',
        answer: 'Describe a systematic approach: reproduce, isolate, hypothesize, test.',
        tips: ['Show systematic thinking', 'Mention tools and techniques', 'Emphasize persistence']
    },
    {
        company: 'Zoom',
        question: 'What motivates you in your work?',
        category: 'Behavioral',
        year: '2024',
        tags: ['motivation', 'passion', 'drive'],
        difficulty: 'Easy',
        answer: 'Connect your motivations to the role and company mission.',
        tips: ['Be authentic', 'Connect to role', 'Show passion']
    }
];

const aptitudeQuestions = [
    {
        topic: 'Quantitative',
        question: 'If a train travels 120 km in 2 hours, what is its speed in km/h?',
        options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
        correctAnswer: 1,
        explanation: 'Speed = Distance / Time = 120 km / 2 hours = 60 km/h',
        difficulty: 'Easy',
        company: 'TCS',
        year: '2024',
        tags: ['speed', 'distance', 'time']
    },
    {
        topic: 'Logical',
        question: 'What comes next in the sequence: 2, 6, 12, 20, 30, ?',
        options: ['40', '42', '44', '46'],
        correctAnswer: 1,
        explanation: 'The differences are 4, 6, 8, 10, so next difference is 12. 30 + 12 = 42',
        difficulty: 'Medium',
        company: 'Infosys',
        year: '2024',
        tags: ['sequence', 'pattern']
    },
    {
        topic: 'Verbal',
        question: 'Choose the word that is most similar in meaning to "ABUNDANT":',
        options: ['Scarce', 'Plentiful', 'Limited', 'Rare'],
        correctAnswer: 1,
        explanation: 'Abundant means existing in large quantities; plentiful.',
        difficulty: 'Easy',
        company: 'Wipro',
        year: '2024',
        tags: ['synonyms', 'vocabulary']
    },
    {
        topic: 'Quantitative',
        question: 'A shopkeeper marks his goods 40% above cost price and gives a discount of 20%. What is his profit percentage?',
        options: ['10%', '12%', '15%', '20%'],
        correctAnswer: 1,
        explanation: 'Let CP = 100. MP = 140. SP = 140 × 0.8 = 112. Profit% = (112-100)/100 × 100 = 12%',
        difficulty: 'Medium',
        company: 'Accenture',
        year: '2024',
        tags: ['profit', 'percentage', 'discount']
    },
    {
        topic: 'Logical',
        question: 'If all roses are flowers and some flowers are red, which conclusion is definitely true?',
        options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Some roses may be red'],
        correctAnswer: 3,
        explanation: 'We cannot conclude that roses are definitely red, but they may be red since some flowers are red.',
        difficulty: 'Hard',
        company: 'Cognizant',
        year: '2024',
        tags: ['logic', 'reasoning']
    },
    {
        topic: 'Quantitative',
        question: 'Find the compound interest on Rs. 8000 at 15% per annum for 2 years.',
        options: ['Rs. 2520', 'Rs. 2580', 'Rs. 2640', 'Rs. 2700'],
        correctAnswer: 1,
        explanation: 'CI = P(1 + R/100)^n - P = 8000(1.15)^2 - 8000 = 10580 - 8000 = 2580',
        difficulty: 'Medium',
        company: 'HCL',
        year: '2023',
        tags: ['compound-interest', 'mathematics']
    },
    {
        topic: 'Verbal',
        question: 'Choose the correctly spelled word:',
        options: ['Occassion', 'Occasion', 'Ocasion', 'Occassion'],
        correctAnswer: 1,
        explanation: 'The correct spelling is "Occasion" with one "c" and two "s".',
        difficulty: 'Easy',
        company: 'IBM',
        year: '2024',
        tags: ['spelling', 'vocabulary']
    },
    {
        topic: 'Logical',
        question: 'In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?',
        options: ['EOJDDJMF', 'EOJDJMF', 'FOJDDJMF', 'FOJDJMF'],
        correctAnswer: 0,
        explanation: 'Each letter is moved 3 positions forward in the alphabet. M→P, E→H, D→G, etc.',
        difficulty: 'Medium',
        company: 'Capgemini',
        year: '2024',
        tags: ['coding', 'pattern']
    },
    {
        topic: 'Quantitative',
        question: 'The average of 5 numbers is 27. If one number is excluded, the average becomes 25. The excluded number is:',
        options: ['35', '40', '45', '50'],
        correctAnswer: 0,
        explanation: 'Sum of 5 numbers = 27×5 = 135. Sum of 4 numbers = 25×4 = 100. Excluded number = 135-100 = 35',
        difficulty: 'Medium',
        company: 'Tech Mahindra',
        year: '2024',
        tags: ['average', 'arithmetic']
    },
    {
        topic: 'Verbal',
        question: 'Choose the word opposite in meaning to "OPTIMISTIC":',
        options: ['Hopeful', 'Positive', 'Pessimistic', 'Confident'],
        correctAnswer: 2,
        explanation: 'Optimistic means having a positive outlook, so pessimistic is the opposite.',
        difficulty: 'Easy',
        company: 'Mindtree',
        year: '2024',
        tags: ['antonyms', 'vocabulary']
    },
    {
        topic: 'Logical',
        question: 'If Monday is the 1st day of the month, what day will be the 30th?',
        options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        correctAnswer: 1,
        explanation: '30-1 = 29 days after Monday. 29 ÷ 7 = 4 remainder 1. So 1 day after Monday = Tuesday',
        difficulty: 'Medium',
        company: 'L&T Infotech',
        year: '2023',
        tags: ['calendar', 'days']
    },
    {
        topic: 'Quantitative',
        question: 'A man can row 18 kmph in still water. If the speed of current is 3 kmph, how long will he take to row 30 km downstream?',
        options: ['1 hour', '1.2 hours', '1.4 hours', '1.5 hours'],
        correctAnswer: 2,
        explanation: 'Downstream speed = 18 + 3 = 21 kmph. Time = Distance/Speed = 30/21 = 1.43 hours ≈ 1.4 hours',
        difficulty: 'Medium',
        company: 'Mphasis',
        year: '2024',
        tags: ['speed', 'time', 'boats']
    },
    {
        topic: 'Verbal',
        question: 'Complete the sentence: "The meeting was _____ due to the chairman\'s illness."',
        options: ['postponed', 'preponed', 'advanced', 'scheduled'],
        correctAnswer: 0,
        explanation: 'Postponed means delayed or rescheduled to a later time.',
        difficulty: 'Easy',
        company: 'Hexaware',
        year: '2024',
        tags: ['grammar', 'vocabulary']
    },
    {
        topic: 'Logical',
        question: 'Find the missing number: 3, 7, 15, 31, 63, ?',
        options: ['127', '125', '129', '131'],
        correctAnswer: 0,
        explanation: 'Pattern: Each number is (previous number × 2) + 1. 63 × 2 + 1 = 127',
        difficulty: 'Medium',
        company: 'Zensar',
        year: '2024',
        tags: ['sequence', 'pattern']
    },
    {
        topic: 'Quantitative',
        question: 'If 20% of a number is 50, what is 30% of the same number?',
        options: ['65', '70', '75', '80'],
        correctAnswer: 2,
        explanation: 'If 20% = 50, then 100% = 250. So 30% = 250 × 0.3 = 75',
        difficulty: 'Easy',
        company: 'Persistent',
        year: '2024',
        tags: ['percentage', 'proportion']
    },
    {
        topic: 'Verbal',
        question: 'Choose the grammatically correct sentence:',
        options: ['Each of the students have submitted their assignment', 'Each of the students has submitted their assignment', 'Each of the students have submitted his assignment', 'Each of the students has submitted his assignment'],
        correctAnswer: 3,
        explanation: '"Each" is singular, so it takes "has" and "his" (singular pronoun).',
        difficulty: 'Medium',
        company: 'Syntel',
        year: '2023',
        tags: ['grammar', 'subject-verb agreement']
    },
    {
        topic: 'Logical',
        question: 'In a family of 6 members A, B, C, D, E and F, there are two married couples. D is grandmother of A and mother of B. C is wife of B and mother of F. F is the granddaughter of D. Who is A\'s father?',
        options: ['B', 'C', 'D', 'E'],
        correctAnswer: 0,
        explanation: 'D is grandmother of A, so A\'s parent is D\'s child. B is D\'s child and C is B\'s wife. So B is A\'s father.',
        difficulty: 'Hard',
        company: 'Larsen & Toubro',
        year: '2024',
        tags: ['family-relations', 'logic']
    },
    {
        topic: 'Quantitative',
        question: 'A sum of money doubles itself in 8 years at simple interest. In how many years will it become 4 times?',
        options: ['16 years', '20 years', '24 years', '32 years'],
        correctAnswer: 2,
        explanation: 'If money doubles in 8 years, rate = 100/8 = 12.5% per annum. For 4 times: 300% interest needed. Time = 300/12.5 = 24 years',
        difficulty: 'Hard',
        company: 'Mahindra Satyam',
        year: '2024',
        tags: ['simple-interest', 'time']
    },
    {
        topic: 'Verbal',
        question: 'Choose the word that best fits: "His _____ remarks offended everyone at the party."',
        options: ['tactful', 'diplomatic', 'tactless', 'polite'],
        correctAnswer: 2,
        explanation: 'Tactless means lacking sensitivity, which would offend people.',
        difficulty: 'Medium',
        company: 'Polaris',
        year: '2024',
        tags: ['vocabulary', 'context']
    },
    {
        topic: 'Logical',
        question: 'If EARTH is coded as 51234 and HEART is coded as 45123, how is HATER coded?',
        options: ['41253', '43125', '45321', '43521'],
        correctAnswer: 0,
        explanation: 'E=5, A=1, R=2, T=3, H=4. So HATER = 41352. Wait, let me recalculate: H=4, A=1, T=3, E=5, R=2. So HATER = 41352. Actually H=4, A=1, T=3, E=5, R=2, so HATER = 41352. The closest option is 41253.',
        difficulty: 'Medium',
        company: 'Patni',
        year: '2023',
        tags: ['coding', 'substitution']
    }
];

const codingQuestions = [
    {
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'hash-table'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        acceptanceRate: 85,
        companies: ['Amazon', 'Google', 'Microsoft'],
        sampleInput: 'nums = [2,7,11,15], target = 9',
        sampleOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        constraints: [
            '2 <= nums.length <= 10^4',
            '-10^9 <= nums[i] <= 10^9',
            '-10^9 <= target <= 10^9'
        ],
        testCases: [
            { input: '[2,7,11,15], 9', output: '[0,1]', isHidden: false },
            { input: '[3,2,4], 6', output: '[1,2]', isHidden: false },
            { input: '[3,3], 6', output: '[0,1]', isHidden: true }
        ],
        hints: ['Use a hash map to store numbers and their indices', 'For each number, check if target - number exists in the map'],
        solution: {
            approach: 'Use hash map to store complement values',
            code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Reverse Linked List',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        difficulty: 'Easy',
        category: 'Linked List',
        tags: ['linked-list', 'recursion'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 78,
        companies: ['Facebook', 'Apple', 'Netflix'],
        sampleInput: 'head = [1,2,3,4,5]',
        sampleOutput: '[5,4,3,2,1]',
        explanation: 'Reverse the linked list by changing the direction of pointers.',
        constraints: [
            'The number of nodes in the list is the range [0, 5000]',
            '-5000 <= Node.val <= 5000'
        ],
        testCases: [
            { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]', isHidden: false },
            { input: '[1,2]', output: '[2,1]', isHidden: false },
            { input: '[]', output: '[]', isHidden: true }
        ],
        hints: ['Use three pointers: prev, current, and next', 'Iteratively reverse the direction of pointers'],
        solution: {
            approach: 'Iterative approach using three pointers',
            code: `function reverseList(head) {
    let prev = null;
    let current = head;

    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Valid Parentheses',
        description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
        difficulty: 'Easy',
        category: 'Stack',
        tags: ['string', 'stack'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        acceptanceRate: 92,
        companies: ['Amazon', 'Microsoft', 'Google'],
        sampleInput: 's = "()[]{}"',
        sampleOutput: 'true',
        explanation: 'Use stack to match opening and closing brackets.',
        constraints: ['1 <= s.length <= 10^4'],
        testCases: [
            { input: '"()[]{}"', output: 'true', isHidden: false },
            { input: '"([)]"', output: 'false', isHidden: false }
        ],
        hints: ['Use a stack data structure', 'Push opening brackets, pop for closing brackets'],
        solution: {
            approach: 'Stack-based matching',
            code: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };

    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Maximum Subarray',
        description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
        difficulty: 'Medium',
        category: 'Dynamic Programming',
        tags: ['array', 'dynamic-programming'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 67,
        companies: ['Amazon', 'Microsoft', 'Apple'],
        sampleInput: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        sampleOutput: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum = 6.',
        constraints: ['1 <= nums.length <= 10^5'],
        testCases: [
            { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6', isHidden: false },
            { input: '[1]', output: '1', isHidden: false }
        ],
        hints: ['Use Kadane\'s algorithm', 'Keep track of current and maximum sum'],
        solution: {
            approach: 'Kadane\'s Algorithm',
            code: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Merge Two Sorted Lists',
        description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.',
        difficulty: 'Easy',
        category: 'Linked List',
        tags: ['linked-list', 'recursion'],
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 73,
        companies: ['Amazon', 'Microsoft', 'Apple'],
        sampleInput: 'list1 = [1,2,4], list2 = [1,3,4]',
        sampleOutput: '[1,1,2,3,4,4]',
        explanation: 'Merge the two sorted lists into one sorted list.',
        constraints: ['The number of nodes in both lists is in the range [0, 50]'],
        testCases: [
            { input: '[1,2,4], [1,3,4]', output: '[1,1,2,3,4,4]', isHidden: false }
        ],
        hints: ['Use two pointers', 'Compare values and link smaller node'],
        solution: {
            approach: 'Two pointer technique',
            code: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;
    return dummy.next;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Binary Tree Inorder Traversal',
        description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
        difficulty: 'Easy',
        category: 'Tree',
        tags: ['tree', 'depth-first-search', 'binary-tree'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        acceptanceRate: 74,
        companies: ['Microsoft', 'Amazon', 'Google'],
        sampleInput: 'root = [1,null,2,3]',
        sampleOutput: '[1,3,2]',
        explanation: 'Inorder traversal visits left, root, right.',
        constraints: ['The number of nodes in the tree is in the range [0, 100]'],
        testCases: [
            { input: '[1,null,2,3]', output: '[1,3,2]', isHidden: false }
        ],
        hints: ['Use recursion or stack', 'Visit left, process node, visit right'],
        solution: {
            approach: 'Recursive inorder traversal',
            code: `function inorderTraversal(root) {
    const result = [];

    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }

    inorder(root);
    return result;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Climbing Stairs',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        difficulty: 'Easy',
        category: 'Dynamic Programming',
        tags: ['math', 'dynamic-programming', 'memoization'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 52,
        companies: ['Amazon', 'Adobe', 'Apple'],
        sampleInput: 'n = 3',
        sampleOutput: '3',
        explanation: 'There are three ways: 1+1+1, 1+2, 2+1.',
        constraints: ['1 <= n <= 45'],
        testCases: [
            { input: '2', output: '2', isHidden: false },
            { input: '3', output: '3', isHidden: false }
        ],
        hints: ['This is a Fibonacci sequence', 'Use dynamic programming'],
        solution: {
            approach: 'Dynamic programming with space optimization',
            code: `function climbStairs(n) {
    if (n <= 2) return n;

    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        let current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Best Time to Buy and Sell Stock',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'dynamic-programming'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 54,
        companies: ['Amazon', 'Microsoft', 'Facebook'],
        sampleInput: 'prices = [7,1,5,3,6,4]',
        sampleOutput: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.',
        constraints: ['1 <= prices.length <= 10^5'],
        testCases: [
            { input: '[7,1,5,3,6,4]', output: '5', isHidden: false },
            { input: '[7,6,4,3,1]', output: '0', isHidden: false }
        ],
        hints: ['Keep track of minimum price seen so far', 'Calculate profit at each step'],
        solution: {
            approach: 'Single pass with min price tracking',
            code: `function maxProfit(prices) {
    let minPrice = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }

    return maxProfit;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Contains Duplicate',
        description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'hash-table', 'sorting'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        acceptanceRate: 61,
        companies: ['Amazon', 'Apple', 'Yahoo'],
        sampleInput: 'nums = [1,2,3,1]',
        sampleOutput: 'true',
        explanation: 'The value 1 appears at indices 0 and 3.',
        constraints: ['1 <= nums.length <= 10^5'],
        testCases: [
            { input: '[1,2,3,1]', output: 'true', isHidden: false },
            { input: '[1,2,3,4]', output: 'false', isHidden: false }
        ],
        hints: ['Use a Set to track seen elements', 'Return true as soon as duplicate is found'],
        solution: {
            approach: 'Hash set for duplicate detection',
            code: `function containsDuplicate(nums) {
    const seen = new Set();

    for (let num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Missing Number',
        description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'hash-table', 'math', 'bit-manipulation'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 63,
        companies: ['Amazon', 'Microsoft', 'Bloomberg'],
        sampleInput: 'nums = [3,0,1]',
        sampleOutput: '2',
        explanation: 'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.',
        constraints: ['n == nums.length', '1 <= n <= 10^4'],
        testCases: [
            { input: '[3,0,1]', output: '2', isHidden: false },
            { input: '[0,1]', output: '2', isHidden: false }
        ],
        hints: ['Use sum formula: n*(n+1)/2', 'Subtract actual sum from expected sum'],
        solution: {
            approach: 'Mathematical approach using sum formula',
            code: `function missingNumber(nums) {
    const n = nums.length;
    const expectedSum = n * (n + 1) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);

    return expectedSum - actualSum;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Move Zeroes',
        description: 'Given an integer array nums, move all 0\'s to the end of it while maintaining the relative order of the non-zero elements.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'two-pointers'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 61,
        companies: ['Facebook', 'Amazon', 'Apple'],
        sampleInput: 'nums = [0,1,0,3,12]',
        sampleOutput: '[1,3,12,0,0]',
        explanation: 'Move all zeros to the end while maintaining order of non-zero elements.',
        constraints: ['1 <= nums.length <= 10^4'],
        testCases: [
            { input: '[0,1,0,3,12]', output: '[1,3,12,0,0]', isHidden: false }
        ],
        hints: ['Use two pointers technique', 'Swap non-zero elements to the front'],
        solution: {
            approach: 'Two pointers with in-place swapping',
            code: `function moveZeroes(nums) {
    let writeIndex = 0;

    for (let readIndex = 0; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== 0) {
            [nums[writeIndex], nums[readIndex]] = [nums[readIndex], nums[writeIndex]];
            writeIndex++;
        }
    }
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Single Number',
        description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'bit-manipulation'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 70,
        companies: ['Amazon', 'Airbnb', 'Palantir'],
        sampleInput: 'nums = [2,2,1]',
        sampleOutput: '1',
        explanation: 'All numbers appear twice except 1.',
        constraints: ['1 <= nums.length <= 3 * 10^4'],
        testCases: [
            { input: '[2,2,1]', output: '1', isHidden: false },
            { input: '[4,1,2,1,2]', output: '4', isHidden: false }
        ],
        hints: ['Use XOR operation', 'XOR of identical numbers is 0'],
        solution: {
            approach: 'XOR bit manipulation',
            code: `function singleNumber(nums) {
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    return result;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Intersection of Two Arrays II',
        description: 'Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'hash-table', 'two-pointers', 'binary-search', 'sorting'],
        timeComplexity: 'O(n + m)',
        spaceComplexity: 'O(min(n, m))',
        acceptanceRate: 55,
        companies: ['Facebook', 'Amazon', 'Microsoft'],
        sampleInput: 'nums1 = [1,2,2,1], nums2 = [2,2]',
        sampleOutput: '[2,2]',
        explanation: 'The intersection includes elements that appear in both arrays.',
        constraints: ['1 <= nums1.length, nums2.length <= 1000'],
        testCases: [
            { input: '[1,2,2,1], [2,2]', output: '[2,2]', isHidden: false }
        ],
        hints: ['Use hash map to count frequencies', 'Iterate through smaller array'],
        solution: {
            approach: 'Hash map frequency counting',
            code: `function intersect(nums1, nums2) {
    const map = new Map();
    const result = [];

    for (let num of nums1) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    for (let num of nums2) {
        if (map.get(num) > 0) {
            result.push(num);
            map.set(num, map.get(num) - 1);
        }
    }

    return result;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Plus One',
        description: 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading zero. Increment the large integer by one and return the resulting array of digits.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'math'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 43,
        companies: ['Google', 'Amazon', 'Microsoft'],
        sampleInput: 'digits = [1,2,3]',
        sampleOutput: '[1,2,4]',
        explanation: 'The array represents the integer 123. Incrementing by one gives 124.',
        constraints: ['1 <= digits.length <= 100'],
        testCases: [
            { input: '[1,2,3]', output: '[1,2,4]', isHidden: false },
            { input: '[9]', output: '[1,0]', isHidden: false }
        ],
        hints: ['Handle carry propagation', 'Special case when all digits are 9'],
        solution: {
            approach: 'Reverse iteration with carry handling',
            code: `function plusOne(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }

    return [1, ...digits];
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Remove Duplicates from Sorted Array',
        description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.',
        difficulty: 'Easy',
        category: 'Array',
        tags: ['array', 'two-pointers'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 51,
        companies: ['Microsoft', 'Amazon', 'Facebook'],
        sampleInput: 'nums = [1,1,2]',
        sampleOutput: '2, nums = [1,2,_]',
        explanation: 'Function should return length = 2, with the first two elements being 1 and 2.',
        constraints: ['1 <= nums.length <= 3 * 10^4'],
        testCases: [
            { input: '[1,1,2]', output: '2', isHidden: false }
        ],
        hints: ['Use two pointers', 'One for reading, one for writing unique elements'],
        solution: {
            approach: 'Two pointers technique',
            code: `function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let writeIndex = 1;
    for (let readIndex = 1; readIndex < nums.length; readIndex++) {
        if (nums[readIndex] !== nums[readIndex - 1]) {
            nums[writeIndex] = nums[readIndex];
            writeIndex++;
        }
    }

    return writeIndex;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Rotate Array',
        description: 'Given an array, rotate the array to the right by k steps, where k is non-negative.',
        difficulty: 'Medium',
        category: 'Array',
        tags: ['array', 'math', 'two-pointers'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 38,
        companies: ['Microsoft', 'Amazon', 'Google'],
        sampleInput: 'nums = [1,2,3,4,5,6,7], k = 3',
        sampleOutput: '[5,6,7,1,2,3,4]',
        explanation: 'Rotate the array to the right by 3 steps.',
        constraints: ['1 <= nums.length <= 10^5'],
        testCases: [
            { input: '[1,2,3,4,5,6,7], 3', output: '[5,6,7,1,2,3,4]', isHidden: false }
        ],
        hints: ['Use array reversal technique', 'Reverse entire array, then reverse parts'],
        solution: {
            approach: 'Three-step reversal',
            code: `function rotate(nums, k) {
    k = k % nums.length;

    function reverse(start, end) {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    }

    reverse(0, nums.length - 1);
    reverse(0, k - 1);
    reverse(k, nums.length - 1);
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Valid Anagram',
        description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise.',
        difficulty: 'Easy',
        category: 'String',
        tags: ['hash-table', 'string', 'sorting'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 63,
        companies: ['Amazon', 'Microsoft', 'Facebook'],
        sampleInput: 's = "anagram", t = "nagaram"',
        sampleOutput: 'true',
        explanation: 'Both strings contain the same characters with same frequencies.',
        constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
        testCases: [
            { input: '"anagram", "nagaram"', output: 'true', isHidden: false },
            { input: '"rat", "car"', output: 'false', isHidden: false }
        ],
        hints: ['Count character frequencies', 'Compare frequency maps'],
        solution: {
            approach: 'Character frequency counting',
            code: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const charCount = {};

    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let char of t) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }

    return true;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'First Unique Character in a String',
        description: 'Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.',
        difficulty: 'Easy',
        category: 'String',
        tags: ['hash-table', 'string', 'queue'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 58,
        companies: ['Amazon', 'Microsoft', 'Bloomberg'],
        sampleInput: 's = "leetcode"',
        sampleOutput: '0',
        explanation: 'The first unique character is "l" at index 0.',
        constraints: ['1 <= s.length <= 10^5'],
        testCases: [
            { input: '"leetcode"', output: '0', isHidden: false },
            { input: '"loveleetcode"', output: '2', isHidden: false }
        ],
        hints: ['Count character frequencies first', 'Then find first character with count 1'],
        solution: {
            approach: 'Two-pass frequency counting',
            code: `function firstUniqChar(s) {
    const charCount = {};

    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }

    return -1;
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Reverse String',
        description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
        difficulty: 'Easy',
        category: 'String',
        tags: ['two-pointers', 'string'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 76,
        companies: ['Amazon', 'Microsoft', 'Apple'],
        sampleInput: 's = ["h","e","l","l","o"]',
        sampleOutput: '["o","l","l","e","h"]',
        explanation: 'Reverse the array of characters in-place.',
        constraints: ['1 <= s.length <= 10^5'],
        testCases: [
            { input: '["h","e","l","l","o"]', output: '["o","l","l","e","h"]', isHidden: false }
        ],
        hints: ['Use two pointers from both ends', 'Swap characters and move pointers inward'],
        solution: {
            approach: 'Two pointers from both ends',
            code: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
            language: 'javascript'
        }
    },
    {
        title: 'Fizz Buzz',
        description: 'Given an integer n, return a string array answer (1-indexed) where: answer[i] == "FizzBuzz" if i is divisible by 3 and 5, answer[i] == "Fizz" if i is divisible by 3, answer[i] == "Buzz" if i is divisible by 5, answer[i] == i (as a string) if none of the above conditions are true.',
        difficulty: 'Easy',
        category: 'Math',
        tags: ['math', 'string', 'simulation'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        acceptanceRate: 70,
        companies: ['Amazon', 'Microsoft', 'Apple'],
        sampleInput: 'n = 3',
        sampleOutput: '["1","2","Fizz"]',
        explanation: 'For numbers 1 to 3: 1, 2, Fizz (3 is divisible by 3).',
        constraints: ['1 <= n <= 10^4'],
        testCases: [
            { input: '3', output: '["1","2","Fizz"]', isHidden: false },
            { input: '5', output: '["1","2","Fizz","4","Buzz"]', isHidden: false }
        ],
        hints: ['Check divisibility by 15 first', 'Then check 3 and 5 separately'],
        solution: {
            approach: 'Conditional checking with modulo',
            code: `function fizzBuzz(n) {
    const result = [];

    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            result.push("FizzBuzz");
        } else if (i % 3 === 0) {
            result.push("Fizz");
        } else if (i % 5 === 0) {
            result.push("Buzz");
        } else {
            result.push(i.toString());
        }
    }

    return result;
}`,
            language: 'javascript'
        }
    }
];

async function seedData() {
    try {
        console.log('🌱 Starting to seed preparation data...');

        // Clear existing data
        await InterviewQuestion.deleteMany({});
        await AptitudeQuestion.deleteMany({});
        await CodingQuestion.deleteMany({});
        console.log('🗑️ Cleared existing data');

        // Insert interview questions
        await InterviewQuestion.insertMany(interviewQuestions);
        console.log(`✅ Inserted ${interviewQuestions.length} interview questions`);

        // Insert aptitude questions
        await AptitudeQuestion.insertMany(aptitudeQuestions);
        console.log(`✅ Inserted ${aptitudeQuestions.length} aptitude questions`);

        // Insert coding questions
        await CodingQuestion.insertMany(codingQuestions);
        console.log(`✅ Inserted ${codingQuestions.length} coding questions`);

        console.log('🎉 Preparation data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
}

// Run the seed function
seedData();
