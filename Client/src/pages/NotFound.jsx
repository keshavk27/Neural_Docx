import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
            <div className="text-center">
                <h1 className="text-8xl font-extrabold text-blue-600">
                    404
                </h1>
                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>
                <p className="mt-3 text-gray-500">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link  to="/" className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};
export default NotFound;