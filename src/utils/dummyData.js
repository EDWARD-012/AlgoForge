export const assessmentQuestions = [
  {
    id: 1,
    question: "What is the time complexity of binary search on a sorted array?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
    correctAnswer: "O(log n)"
  },
  {
    id: 2,
    question: "Which data structure operates on a Last-In-First-Out (LIFO) principle?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    correctAnswer: "Stack"
  },
  {
    id: 3,
    question: "What is the worst-case space complexity of breadth-first search on a tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: "O(n)"
  }
];

export const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    tags: ["Array", "Hash Table"],
    acceptance: "49.1%",
    description: "Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to* `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.",
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
        explanation: null
      }
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists."
    ],
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> solve(vector<int>& arr) {
        // arr = [num1, num2, ..., numN, target]
        // The last element is target; rest are nums
        
    }
};`,
      java: `class Solution {
    public int[] solve(int[] arr) {
        // arr = [num1, num2, ..., numN, target]
        // The last element is target; rest are nums
        
    }
}`,
      python: `class Solution:
    def solve(self, arr):
        # arr = [num1, num2, ..., numN, target]
        # The last element is target; rest are nums
        pass
`,
      javascript: `// JavaScript is not yet supported for execution.
// Please switch to C++, Python, or Java.
var solve = function(arr) {
    
};`
    }
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stacks",
    tags: ["String", "Stack"],
    acceptance: "40.7%",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: null
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: null
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: null
      }
    ],
    constraints: [
      "1 <= s.length <= 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> solve(vector<int>& arr) {
        // arr contains ASCII values of the string characters
        // Return [1] for valid, [0] for invalid
        
    }
};`,
      java: `class Solution {
    public int[] solve(int[] arr) {
        // arr contains ASCII values of the string characters
        // Return [1] for valid, [0] for invalid
        
    }
}`,
      python: `class Solution:
    def solve(self, arr):
        # arr contains ASCII values of the string characters
        # Return [1] for valid, [0] for invalid
        pass
`,
      javascript: `// JavaScript is not yet supported for execution.
var solve = function(arr) {
    
};`
    }
  },
  {
    id: 3,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays",
    tags: ["Array", "Dynamic Programming"],
    acceptance: "54.3%",
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `iᵗʰ` day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn *the maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return `0`.",
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    constraints: [
      "1 <= prices.length <= 10⁵",
      "0 <= prices[i] <= 10⁴"
    ],
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> solve(vector<int>& arr) {
        // arr = prices array
        // Return [maxProfit]
        
    }
};`,
      java: `class Solution {
    public int[] solve(int[] arr) {
        // arr = prices array
        // Return [maxProfit]
        
    }
}`,
      python: `class Solution:
    def solve(self, arr):
        # arr = prices array
        # Return [maxProfit]
        pass
`,
      javascript: `// JavaScript is not yet supported for execution.
var solve = function(arr) {
    
};`
    }
  }
];
