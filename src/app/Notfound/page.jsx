export default function NotFoundPage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-gray-400 mt-2">Oops! The page you are looking for does not exist.</p>
        <a
          href="/"
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Go Home
        </a>
      </div>
    );
  }
  