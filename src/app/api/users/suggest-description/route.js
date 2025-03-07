import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req) {

  const res =await req.json();
  
  
  // Extract the `prompt` from the body of the request
  const  prompt  =`With given username and title generate a concise and compelling description highlighting the user’s role, key skills, and professional expertise. The description should be professional, showcasing the user’s qualifications, experience, and contributions in their field and start with hey.There should be minimum of 50 words
          Username: ${res.prompt.fullName}
          Professional Title: ${res.prompt.userTitle}
          `;

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