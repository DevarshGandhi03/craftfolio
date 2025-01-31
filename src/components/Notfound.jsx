export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
        <h1 className="text-8xl font-extrabold text-gray-700">404</h1>
        <p className="text-2xl text-gray-700 mt-4">User Portfolio Not Found</p>
        <p className="text-lg text-gray-500 mt-2 max-w-lg">
          Sorry, we couldn't find the portfolio you were looking for. It might have been moved, deleted, or never existed.
        </p>
        <a
          href="/"
          className="mt-6 px-6 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
        >
          Return to Home
        </a>
      </div>
    );
  }
  