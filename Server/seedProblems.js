const mongoose = require('mongoose');
const Problem = require('./models/Problem');
require('dotenv').config();

const problems = [
    // Easy Problem 1: Two Sum
    {
        title: "Two Sum",
        description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        companies: ["Amazon", "Google", "Microsoft"],
        acceptanceRate: 49.1,
        constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
        ],
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            },
            {
                input: "nums = [3,2,4], target = 6",
                output: "[1,2]",
                explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
            },
            {
                input: "nums = [3,3], target = 6",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
            }
        ],
        testCases: [
            {
                input: "[[2,7,11,15], 9]",
                output: "[0,1]"
            },
            {
                input: "[[3,2,4], 6]",
                output: "[1,2]"
            },
            {
                input: "[[3,3], 6]",
                output: "[0,1]"
            }
        ],
        functionTemplates: {
            python: `def two_sum(nums, target):
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
    result = two_sum(*test_data)
    print(json.dumps(result))`,

            javascript: `function twoSum(nums, target) {
    /**
     * Complete this function to solve the problem.
     *
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target integer
     * @returns {number[]} Array representing the solution
     */
    // Write your code here
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
});`,

            java: `import java.util.*;
import java.io.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
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
                // Simple parsing for [[nums], target] format
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

            Solution solution = new Solution();
            int[] result = solution.twoSum(nums, target);

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
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
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
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;

    Solution solution;
    vector<int> result = solution.twoSum(nums, target);

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

/*
 * Complete this function to solve the problem.
 *
 * @param nums Array of integers
 * @param numsSize Size of the nums array
 * @param target Target integer
 * @param returnSize Pointer to store the size of returned array
 * @return Array representing the solution
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
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

    int* result = twoSum(nums, numsSize, target, &returnSize);

    printf("[");
    for (int i = 0; i < returnSize; i++) {
        printf("%d", result[i]);
        if (i < returnSize - 1) printf(",");
    }
    printf("]\\n");

    if (result) free(result);
    return 0;
}`
        },
        hints: [
            "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
            "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
            "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
        ],
        solution: "Use a hash map to store the complement of each number as you iterate through the array.",
        isDailyProblem: false
    },

    // Easy Problem 2: Palindrome Number
    {
        title: "Palindrome Number",
        description: `Given an integer x, return true if x is a palindrome, and false otherwise.

An integer is a palindrome when it reads the same backward as forward.

For example, 121 is a palindrome while 123 is not.`,
        difficulty: "Easy",
        tags: ["Math"],
        companies: ["Amazon", "Apple", "Facebook"],
        acceptanceRate: 52.3,
        constraints: [
            "-2^31 <= x <= 2^31 - 1"
        ],
        examples: [
            {
                input: "x = 121",
                output: "true",
                explanation: "121 reads as 121 from left to right and from right to left."
            },
            {
                input: "x = -121",
                output: "false",
                explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
            },
            {
                input: "x = 10",
                output: "false",
                explanation: "Reads 01 from right to left. Therefore it is not a palindrome."
            }
        ],
        testCases: [
            {
                input: "[121]",
                output: "true"
            },
            {
                input: "[-121]",
                output: "false"
            },
            {
                input: "[10]",
                output: "false"
            },
            {
                input: "[0]",
                output: "true"
            }
        ],
        functionTemplates: {
            python: `def is_palindrome(x):
    """
    Complete this function to solve the problem.

    Args:
        x: Integer to check

    Returns:
        Boolean indicating if x is a palindrome
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
            test_data = [121]  # Default test case
    except:
        test_data = [121]  # Default test case

    # Call the function with test data
    result = is_palindrome(*test_data)
    print(json.dumps(result))`,

            javascript: `function isPalindrome(x) {
    /**
     * Complete this function to solve the problem.
     *
     * @param {number} x - Integer to check
     * @returns {boolean} True if x is palindrome, false otherwise
     */
    // Write your code here
    return false;
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
            testData = [121]; // Default test case
        }

        const result = isPalindrome(...testData);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.log(JSON.stringify(false));
    }
});`,

            java: `import java.util.*;
import java.io.*;

public class Solution {
    public boolean isPalindrome(int x) {
        /*
         * Complete this function to solve the problem.
         *
         * @param x Integer to check
         * @return True if x is palindrome, false otherwise
         */
        // Write your code here
        return false;
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
            int x;
            if (!input.isEmpty()) {
                input = input.replaceAll("[\\[\\]]", "");
                x = Integer.parseInt(input.trim());
            } else {
                x = 121;
            }

            Solution solution = new Solution();
            boolean result = solution.isPalindrome(x);

            System.out.println(result);

        } catch (Exception e) {
            System.out.println(false);
        }
    }
}`,

            cpp: `#include <iostream>
using namespace std;

class Solution {
public:
    bool isPalindrome(int x) {
        /*
         * Complete this function to solve the problem.
         *
         * @param x Integer to check
         * @return True if x is palindrome, false otherwise
         */
        // Write your code here
        return false;
    }
};

// Driver code - DO NOT MODIFY
int main() {
    int x = 121;

    Solution solution;
    bool result = solution.isPalindrome(x);

    cout << (result ? "true" : "false") << endl;

    return 0;
}`,

            c: `#include <stdio.h>
#include <stdbool.h>

/*
 * Complete this function to solve the problem.
 *
 * @param x Integer to check
 * @return True if x is palindrome, false otherwise
 */
bool isPalindrome(int x) {
    // Write your code here
    return false;
}

// Driver code - DO NOT MODIFY
int main() {
    int x = 121;

    bool result = isPalindrome(x);

    printf("%s\\n", result ? "true" : "false");

    return 0;
}`
        },
        hints: [
            "Beware of overflow when you reverse the integer.",
            "Could you solve it without converting the integer to a string?"
        ],
        solution: "Reverse half of the number and compare with the other half.",
        isDailyProblem: false
    },

    // Easy Problem 3: Valid Parentheses
    {
        title: "Valid Parentheses",
        description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
        difficulty: "Easy",
        tags: ["String", "Stack"],
        companies: ["Amazon", "Microsoft", "Facebook"],
        acceptanceRate: 40.1,
        constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'."
        ],
        examples: [
            {
                input: 's = "()"',
                output: "true",
                explanation: "The string contains valid parentheses."
            },
            {
                input: 's = "()[]{}"',
                output: "true",
                explanation: "All brackets are properly matched."
            },
            {
                input: 's = "(]"',
                output: "false",
                explanation: "Brackets are not properly matched."
            }
        ],
        testCases: [
            {
                input: '["()"]',
                output: "true"
            },
            {
                input: '["()[]{}"]',
                output: "true"
            },
            {
                input: '["(]"]',
                output: "false"
            },
            {
                input: '["([)]"]',
                output: "false"
            }
        ],
        functionTemplates: {
            python: `def is_valid(s):
    """
    Complete this function to solve the problem.

    Args:
        s: String containing parentheses

    Returns:
        Boolean indicating if parentheses are valid
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
            test_data = ["()"]  # Default test case
    except:
        test_data = ["()"]  # Default test case

    # Call the function with test data
    result = is_valid(*test_data)
    print(json.dumps(result))`,

            javascript: `function isValid(s) {
    /**
     * Complete this function to solve the problem.
     *
     * @param {string} s - String containing parentheses
     * @returns {boolean} True if parentheses are valid, false otherwise
     */
    // Write your code here
    return false;
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
            testData = ["()"]; // Default test case
        }

        const result = isValid(...testData);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.log(JSON.stringify(false));
    }
});`,

            java: `import java.util.*;
import java.io.*;

public class Solution {
    public boolean isValid(String s) {
        /*
         * Complete this function to solve the problem.
         *
         * @param s String containing parentheses
         * @return True if parentheses are valid, false otherwise
         */
        // Write your code here
        return false;
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
            String s;
            if (!input.isEmpty()) {
                input = input.replaceAll("[\\[\\]\"]", "");
                s = input.trim();
            } else {
                s = "()";
            }

            Solution solution = new Solution();
            boolean result = solution.isValid(s);

            System.out.println(result);

        } catch (Exception e) {
            System.out.println(false);
        }
    }
}`,

            cpp: `#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        /*
         * Complete this function to solve the problem.
         *
         * @param s String containing parentheses
         * @return True if parentheses are valid, false otherwise
         */
        // Write your code here
        return false;
    }
};

// Driver code - DO NOT MODIFY
int main() {
    string s = "()";

    Solution solution;
    bool result = solution.isValid(s);

    cout << (result ? "true" : "false") << endl;

    return 0;
}`,

            c: `#include <stdio.h>
#include <stdbool.h>
#include <string.h>

/*
 * Complete this function to solve the problem.
 *
 * @param s String containing parentheses
 * @return True if parentheses are valid, false otherwise
 */
bool isValid(char* s) {
    // Write your code here
    return false;
}

// Driver code - DO NOT MODIFY
int main() {
    char s[] = "()";

    bool result = isValid(s);

    printf("%s\\n", result ? "true" : "false");

    return 0;
}`
        },
        hints: [
            "Use a stack to keep track of opening brackets.",
            "When you encounter a closing bracket, check if it matches the most recent opening bracket."
        ],
        solution: "Use a stack to match opening and closing brackets.",
        isDailyProblem: false
    },

    // Medium Problem 1: Add Two Numbers
    {
        title: "Add Two Numbers",
        description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
        difficulty: "Medium",
        tags: ["Linked List", "Math", "Recursion"],
        companies: ["Amazon", "Microsoft", "Apple"],
        acceptanceRate: 38.4,
        constraints: [
            "The number of nodes in each linked list is in the range [1, 100].",
            "0 <= Node.val <= 9",
            "It is guaranteed that the list represents a number that does not have leading zeros."
        ],
        examples: [
            {
                input: "l1 = [2,4,3], l2 = [5,6,4]",
                output: "[7,0,8]",
                explanation: "342 + 465 = 807."
            },
            {
                input: "l1 = [0], l2 = [0]",
                output: "[0]",
                explanation: "0 + 0 = 0."
            },
            {
                input: "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
                output: "[8,9,9,9,0,0,0,1]",
                explanation: "9999999 + 9999 = 10009998."
            }
        ],
        testCases: [
            {
                input: "[[2,4,3], [5,6,4]]",
                output: "[7,0,8]"
            },
            {
                input: "[[0], [0]]",
                output: "[0]"
            },
            {
                input: "[[9,9,9,9,9,9,9], [9,9,9,9]]",
                output: "[8,9,9,9,0,0,0,1]"
            }
        ],
        functionTemplates: {
            python: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def add_two_numbers(l1, l2):
    """
    Complete this function to solve the problem.

    Args:
        l1: ListNode representing first number
        l2: ListNode representing second number

    Returns:
        ListNode representing the sum
    """
    # Write your code here
    pass

# Driver code - DO NOT MODIFY
def list_to_linked_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

def linked_list_to_list(head):
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result

if __name__ == "__main__":
    import json
    import sys

    # Read input from stdin or use default test case
    try:
        line = input().strip()
        if line:
            test_data = json.loads(line)
        else:
            test_data = [[2, 4, 3], [5, 6, 4]]  # Default test case
    except:
        test_data = [[2, 4, 3], [5, 6, 4]]  # Default test case

    # Convert arrays to linked lists
    l1 = list_to_linked_list(test_data[0])
    l2 = list_to_linked_list(test_data[1])

    # Call the function
    result_head = add_two_numbers(l1, l2)

    # Convert result back to array
    result = linked_list_to_list(result_head)
    print(json.dumps(result))`,

            javascript: `// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function addTwoNumbers(l1, l2) {
    /**
     * Complete this function to solve the problem.
     *
     * @param {ListNode} l1 - First linked list
     * @param {ListNode} l2 - Second linked list
     * @returns {ListNode} Sum as linked list
     */
    // Write your code here
    return null;
}

// Driver code - DO NOT MODIFY
function arrayToLinkedList(arr) {
    if (!arr || arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function linkedListToArray(head) {
    let result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

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
            testData = [[2, 4, 3], [5, 6, 4]]; // Default test case
        }

        const l1 = arrayToLinkedList(testData[0]);
        const l2 = arrayToLinkedList(testData[1]);
        const result = addTwoNumbers(l1, l2);
        const resultArray = linkedListToArray(result);
        console.log(JSON.stringify(resultArray));
    } catch (error) {
        console.log(JSON.stringify([]));
    }
});`,

            java: `import java.util.*;
import java.io.*;

// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        /*
         * Complete this function to solve the problem.
         *
         * @param l1 First linked list
         * @param l2 Second linked list
         * @return Sum as linked list
         */
        // Write your code here
        return null;
    }

    // Driver code - DO NOT MODIFY
    public static ListNode arrayToLinkedList(int[] arr) {
        if (arr.length == 0) return null;
        ListNode head = new ListNode(arr[0]);
        ListNode current = head;
        for (int i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }

    public static int[] linkedListToArray(ListNode head) {
        List<Integer> result = new ArrayList<>();
        ListNode current = head;
        while (current != null) {
            result.add(current.val);
            current = current.next;
        }
        return result.stream().mapToInt(i -> i).toArray();
    }

    public static void main(String[] args) {
        try {
            int[] arr1 = {2, 4, 3};
            int[] arr2 = {5, 6, 4};

            ListNode l1 = arrayToLinkedList(arr1);
            ListNode l2 = arrayToLinkedList(arr2);

            Solution solution = new Solution();
            ListNode result = solution.addTwoNumbers(l1, l2);
            int[] resultArray = linkedListToArray(result);

            System.out.print("[");
            for (int i = 0; i < resultArray.length; i++) {
                System.out.print(resultArray[i]);
                if (i < resultArray.length - 1) System.out.print(",");
            }
            System.out.println("]");

        } catch (Exception e) {
            System.out.println("[]");
        }
    }
}`,

            cpp: `#include <vector>
#include <iostream>
using namespace std;

// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        /*
         * Complete this function to solve the problem.
         *
         * @param l1 First linked list
         * @param l2 Second linked list
         * @return Sum as linked list
         */
        // Write your code here
        return nullptr;
    }
};

// Driver code - DO NOT MODIFY
ListNode* arrayToLinkedList(vector<int>& arr) {
    if (arr.empty()) return nullptr;
    ListNode* head = new ListNode(arr[0]);
    ListNode* current = head;
    for (int i = 1; i < arr.size(); i++) {
        current->next = new ListNode(arr[i]);
        current = current->next;
    }
    return head;
}

vector<int> linkedListToArray(ListNode* head) {
    vector<int> result;
    ListNode* current = head;
    while (current) {
        result.push_back(current->val);
        current = current->next;
    }
    return result;
}

int main() {
    vector<int> arr1 = {2, 4, 3};
    vector<int> arr2 = {5, 6, 4};

    ListNode* l1 = arrayToLinkedList(arr1);
    ListNode* l2 = arrayToLinkedList(arr2);

    Solution solution;
    ListNode* result = solution.addTwoNumbers(l1, l2);
    vector<int> resultArray = linkedListToArray(result);

    cout << "[";
    for (int i = 0; i < resultArray.size(); i++) {
        cout << resultArray[i];
        if (i < resultArray.size() - 1) cout << ",";
    }
    cout << "]" << endl;

    return 0;
}`,

            c: `#include <stdio.h>
#include <stdlib.h>

// Definition for singly-linked list.
struct ListNode {
    int val;
    struct ListNode *next;
};

/*
 * Complete this function to solve the problem.
 *
 * @param l1 First linked list
 * @param l2 Second linked list
 * @return Sum as linked list
 */
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    // Write your code here
    return NULL;
}

// Driver code - DO NOT MODIFY
struct ListNode* createNode(int val) {
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

int main() {
    // Create test linked lists: [2,4,3] and [5,6,4]
    struct ListNode* l1 = createNode(2);
    l1->next = createNode(4);
    l1->next->next = createNode(3);

    struct ListNode* l2 = createNode(5);
    l2->next = createNode(6);
    l2->next->next = createNode(4);

    struct ListNode* result = addTwoNumbers(l1, l2);

    printf("[");
    struct ListNode* current = result;
    int first = 1;
    while (current) {
        if (!first) printf(",");
        printf("%d", current->val);
        current = current->next;
        first = 0;
    }
    printf("]\\n");

    return 0;
}`
        },
        hints: [
            "Think about how you would add two numbers on paper. You start from the least significant digit.",
            "Since the digits are stored in reverse order, you can iterate through both lists simultaneously.",
            "Don't forget to handle the carry and the case where one list is longer than the other."
        ],
        solution: "Iterate through both linked lists simultaneously, handling carry and different lengths.",
        isDailyProblem: false
    },

    // Medium Problem 2: Longest Substring Without Repeating Characters
    {
        title: "Longest Substring Without Repeating Characters",
        description: `Given a string s, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.`,
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Sliding Window"],
        companies: ["Amazon", "Facebook", "Microsoft"],
        acceptanceRate: 33.8,
        constraints: [
            "0 <= s.length <= 5 * 10^4",
            "s consists of English letters, digits, symbols and spaces."
        ],
        examples: [
            {
                input: 's = "abcabcbb"',
                output: "3",
                explanation: 'The answer is "abc", with the length of 3.'
            },
            {
                input: 's = "bbbbb"',
                output: "1",
                explanation: 'The answer is "b", with the length of 1.'
            },
            {
                input: 's = "pwwkew"',
                output: "3",
                explanation: 'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.'
            }
        ],
        testCases: [
            {
                input: '["abcabcbb"]',
                output: "3"
            },
            {
                input: '["bbbbb"]',
                output: "1"
            },
            {
                input: '["pwwkew"]',
                output: "3"
            },
            {
                input: '[""]',
                output: "0"
            }
        ],
        functionTemplates: {
            python: `def length_of_longest_substring(s):
    """
    Complete this function to solve the problem.

    Args:
        s: Input string

    Returns:
        Integer representing the length of longest substring
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
            test_data = ["abcabcbb"]  # Default test case
    except:
        test_data = ["abcabcbb"]  # Default test case

    # Call the function with test data
    result = length_of_longest_substring(*test_data)
    print(json.dumps(result))`,

            javascript: `function lengthOfLongestSubstring(s) {
    /**
     * Complete this function to solve the problem.
     *
     * @param {string} s - Input string
     * @returns {number} Length of longest substring without repeating characters
     */
    // Write your code here
    return 0;
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
            testData = ["abcabcbb"]; // Default test case
        }

        const result = lengthOfLongestSubstring(...testData);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.log(JSON.stringify(0));
    }
});`,

            java: `import java.util.*;
import java.io.*;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        /*
         * Complete this function to solve the problem.
         *
         * @param s Input string
         * @return Length of longest substring without repeating characters
         */
        // Write your code here
        return 0;
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
            String s;
            if (!input.isEmpty()) {
                input = input.replaceAll("[\\[\\]\"]", "");
                s = input.trim();
            } else {
                s = "abcabcbb";
            }

            Solution solution = new Solution();
            int result = solution.lengthOfLongestSubstring(s);

            System.out.println(result);

        } catch (Exception e) {
            System.out.println(0);
        }
    }
}`,

            cpp: `#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        /*
         * Complete this function to solve the problem.
         *
         * @param s Input string
         * @return Length of longest substring without repeating characters
         */
        // Write your code here
        return 0;
    }
};

// Driver code - DO NOT MODIFY
int main() {
    string s = "abcabcbb";

    Solution solution;
    int result = solution.lengthOfLongestSubstring(s);

    cout << result << endl;

    return 0;
}`,

            c: `#include <stdio.h>
#include <string.h>

/*
 * Complete this function to solve the problem.
 *
 * @param s Input string
 * @return Length of longest substring without repeating characters
 */
int lengthOfLongestSubstring(char* s) {
    // Write your code here
    return 0;
}

// Driver code - DO NOT MODIFY
int main() {
    char s[] = "abcabcbb";

    int result = lengthOfLongestSubstring(s);

    printf("%d\\n", result);

    return 0;
}`
        },
        hints: [
            "Use the sliding window technique with two pointers.",
            "Use a hash set to keep track of characters in the current window.",
            "When you encounter a repeating character, move the left pointer."
        ],
        solution: "Use sliding window technique with hash set to track characters.",
        isDailyProblem: false
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedProblems = async () => {
    try {
        await connectDB();
        
        // Clear existing problems (optional)
        console.log('Clearing existing problems...');
        await Problem.deleteMany({});
        
        // Insert new problems
        console.log('Seeding problems...');
        const insertedProblems = await Problem.insertMany(problems);
        
        console.log(`Successfully seeded ${insertedProblems.length} problems:`);
        insertedProblems.forEach((problem, index) => {
            console.log(`${index + 1}. ${problem.title} (${problem.difficulty})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding problems:', error);
        process.exit(1);
    }
};

// Run the seeding
if (require.main === module) {
    seedProblems();
}

module.exports = { seedProblems, problems };
