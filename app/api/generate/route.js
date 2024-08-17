import { NextResponse } from 'next/server'

// Hardcoded flashcards array
const flashcards = [
  {
    front: "What is a variable in programming?",
    back: "A variable is a storage location in memory with a specific name that holds a value which can be changed during program execution."
  },
  {
    front: "What is the difference between supervised and unsupervised learning?",
    back: "Supervised learning involves training a model on labeled data, whereas unsupervised learning involves finding patterns in unlabeled data."
  },
  {
    front: "Define a 'for loop' in programming.",
    back: "A 'for loop' is a control flow statement that allows code to be executed repeatedly based on a given boolean condition. It typically includes an initialization, a condition, and an iteration expression."
  },
  {
    front: "What is Big O notation?",
    back: "Big O notation is a mathematical notation used to describe the upper bound of an algorithm's runtime complexity, showing the worst-case scenario as the input size grows."
  },
  {
    front: "What does 'AI' stand for, and what is its primary goal?",
    back: "'AI' stands for Artificial Intelligence, and its primary goal is to create systems that can perform tasks that typically require human intelligence, such as learning, reasoning, and problem-solving."
  },
  {
    front: "What is a neural network?",
    back: "A neural network is a series of algorithms that attempts to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates."
  },
  {
    front: "How does a binary search algorithm work?",
    back: "A binary search algorithm works by repeatedly dividing a sorted dataset in half, comparing the target value to the middle element, and then deciding which half to continue the search in."
  },
  {
    front: "What is an API?",
    back: "An API, or Application Programming Interface, is a set of rules that allows different software entities to communicate with each other."
  },
  {
    front: "Give an example of a practical application of machine learning.",
    back: "One example of a practical application of machine learning is email spam filtering, where the algorithm learns to distinguish between spam and legitimate emails based on features extracted from the email content."
  },
  {
    front: "What is the difference between '==' and '===' in JavaScript?",
    back: "'==' checks for equality after type coercion, whereas '===' checks for strict equality without type conversion."
  },
  {
    front: "Explain what a 'function' is in programming.",
    back: "A function is a block of code designed to perform a particular task, which can be executed whenever needed throughout a program."
  },
  {
    front: "What is the Turing Test?",
    back: "The Turing Test is a method of inquiry in AI for determining whether or not a computer is capable of thinking like a human being."
  },
  {
    front: "What is a data structure?",
    back: "A data structure is a specialized format for organizing, processing, and storing data to enable efficient access and modification."
  },
  {
    front: "What is the purpose of a compiler?",
    back: "A compiler is a program that translates high-level source code written by a programmer into machine code that a computer's processor can execute."
  },
  {
    front: "What does 'inheritance' mean in object-oriented programming?",
    back: "Inheritance is a mechanism in object-oriented programming that allows a new class to inherit properties and behaviors (methods) from an existing class."
  },
  {
    front: "What is overfitting in machine learning?",
    back: "Overfitting occurs when a machine learning model learns the training data too well, including its noise and outliers, leading to poor generalization to new, unseen data."
  },
  {
    front: "Define 'recursion' in programming.",
    back: "Recursion in programming refers to a function calling itself in order to solve a smaller instance of the same problem, typically with a base case to end the recursion."
  },
  {
    front: "What is the role of a database in software development?",
    back: "A database is a system used to store, manage, and retrieve data for an application, ensuring data is organized and accessible efficiently."
  },
  {
    front: "What is the difference between 'stack' and 'queue' data structures?",
    back: "A stack is a Last In, First Out (LIFO) data structure where the last element added is the first to be removed. A queue is a First In, First Out (FIFO) data structure where the first element added is the first to be removed."
  },
  {
    front: "What is the purpose of version control systems like Git?",
    back: "Version control systems like Git help manage changes to source code over time, allowing multiple developers to collaborate and track the history of a project."
  }
];

// Function to shuffle the array and return a random selection of flashcards
function getRandomFlashcards(flashcardsArray, count = 10) {
  const shuffled = flashcardsArray.sort(() => 0.5 - Math.random()); // Simple array shuffle
  return shuffled.slice(0, count); // Return the first `count` flashcards
}

export async function POST(req) {
    // Select 10 random flashcards from the hardcoded list
    const selectedFlashcards = getRandomFlashcards(flashcards);

    // Return the selected flashcards as a JSON response
    return NextResponse.json({ flashcards: selectedFlashcards });
}
