// let’s set up the imports and define the system prompt

import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
3
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flasho
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 Flashcards.

Remember, the goal is to facilitate effective learning and retention of information through these flashcards.

Return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}

`

// This section imports the necessary modules 
// and defines the system prompt that instructs the AI on how to create flashcards.

// let’s implement the POST function
/*
This sets up the basic structure of our POST request handler. 
It creates a new OpenAI client instance and extracts the text data from the request body.
*/

// Implement the OpenAI API call
/*
1. It creates a chat completion request to the OpenAI API.
2. The `messages` array includes two elements:
— A ‘system’ message with our predefined `systemPrompt`, which instructs the AI on how to create flashcards.
— A ‘user’ message containing the input text from the request body.
3. We specify ‘gpt-4o’ as the model to use.
4. We set the `response_format` to ‘json_object’ to ensure we receive a JSON response.
*/

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
  
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
    })
  
    console.log(completion.choices[0].message.content)
    // we’ll process the API response and return the flashcards
    // Process the API response and return the flashcards

    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)
  
    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  }

/* 
1. We parse the JSON content from the API response using `JSON.parse()`. 
The response is expected to be in the format specified in our system prompt, with a `flashcards` array containing objects with `front` and `back` properties.

2. We return the `flashcards` array from the parsed JSON using `NextResponse.json()`. 
This sends the flashcards back to the client as a JSON response.

This completes the implementation of our flashcard generation API route. 
It takes in text from the request body, uses OpenAI’s GPT-4o model to generate flashcards based on that text, 
and returns the generated flashcards as a JSON response.
*/








