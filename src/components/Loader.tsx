
const Loader : React.FC <{ isLoading: boolean, message?: string }> = ({ isLoading, message = "Loading..." }) => {  // Added a default message
    if (!isLoading) {
        return null; 
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 bg-gray-800 z-50">
            <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-b-2 border-blue-500 rounded-full mb-2" role="status">
                    <span className="sr-only">{message}</span>
                </div>
                <p className="text-gray-700">{message}</p>
            </div>
        </div>
    );
};

export default Loader;