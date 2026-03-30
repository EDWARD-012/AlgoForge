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
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    starterCode: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Medium",
    topic: "Stacks",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and in the correct order.",
    starterCode: "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
  },
  {
    id: 3,
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topic: "Linked Lists",
    description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.\n\nThe linked-lists are merged by splicing together the nodes of the first two lists, and so on.",
    starterCode: "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};"
  }
];
