import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { name, email, message });
    // Add form submission logic here
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 md:px-12 lg:px-16 py-12 bg-white ">
      <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 text-center  dark:to-white text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-8 md:mb-12">
        Get In Touch
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Have a question or want to work together? Fill out the form below and
        I'll respond as soon as possible.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name & Email on One Line */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring focus:ring-blue-300 focus:border-blue-500 transition shadow-sm"
            placeholder="Your Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-1/2 p-4 bg-gray-100 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring focus:ring-blue-300 focus:border-blue-500 transition shadow-sm"
            placeholder="Your Email Address"
          />
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 placeholder-gray-500 focus:ring focus:ring-blue-300 focus:border-blue-500 transition shadow-sm"
          placeholder="Your Message"
          rows="5"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition shadow-md"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
