import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-200 text-center">
      {/* Animated Icon */}
      <div className="relative mb-6">
        <div className="h-28 w-28 rounded-full border-4 border-error animate-pulse"></div>
        <span className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-error">
          🚫
        </span>
      </div>

      {/* Text */}
      <h1 className="text-4xl font-bold text-error mb-2">403 Forbidden</h1>
      <p className="text-gray-600 max-w-md">
        Sorry, you don’t have permission to access this page.
      </p>

      {/* Button */}
      <Link to={'/'}><button
       
        className="btn btn-error btn-outline mt-6"
      >
        Back To Home
      </button></Link>
      <Link to={'/dashboard'}><button
       
        className="btn btn-error btn-outline mt-6"
      >
        Back To Dashboard
      </button></Link>
    </div>
  );
};

export default Forbidden;
