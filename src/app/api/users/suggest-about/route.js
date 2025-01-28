import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req) {

  const res =await req.json();
  
  
  // Extract the `prompt` from the body of the request
  const  prompt  =`Write a professional and engaging 'About' section for a portfolio website. The section should reflect the username ${res.prompt.fullName}and their professional title '${res.prompt.userTitle}.' Highlight their expertise, passion for the field, key accomplishments, and a glimpse into their personality or career aspirations. The tone should be approachable yet professional, making them stand out to potential employers or collaborators.And it should be a littel casual with minmum of 100 words`;

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