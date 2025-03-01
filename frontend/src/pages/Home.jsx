import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <p className="text-gray-600 mb-6">Manage your tasks efficiently.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Login</Link>
        <br />
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Register</Link>

        
      </div>
    </div>
  );
};



export default Home;
