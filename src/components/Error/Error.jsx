import { Link } from "react-router";


const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 px-4">
      <h1 className="text-9xl font-extrabold ">404</h1>
      <p className="text-2xl md:text-3xl mt-4 font-semibold">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Go Back Home
      </Link>
      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        Go Back Dashboard
      </Link>
    </div>
  );
};

export default Error;
