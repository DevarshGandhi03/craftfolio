import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req) {

  const res =await req.json();
  
  
  // Extract the `prompt` from the body of the request
  const  prompt  =`Generate a JSON response consisting of an array of four objects based on the user's professional title and name. The structure of each object should be:

title: A concise title reflecting a core skill, specialty, or focus area of the user.
description: A brief, engaging explanation of the skill or specialty, highlighting its relevance to the user's professional role.
icon: A Lucide React icon name that visually represents the context of the title.
Use the following details:

User Name: ${res.prompt.fullName}
User Title: ${res.prompt.userTitle}
Ensure the JSON response directly aligns with the provided name and title and is well-formatted for direct use in a frontend component. Do not include any additional text or explanations, only return the JSON output.And the array response should be enclosed in ' `;

  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
