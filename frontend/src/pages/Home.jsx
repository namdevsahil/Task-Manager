import { Link } from "react-router-dom";

const Home = () => {
  return (

    <div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Welcome to Task Manager</h1>
      <p class="py-6">
      Manage your tasks efficiently.
      </p>
      <div className="space-x-4">
        <Link to="/login" className=" text-white px-4 py-2 rounded-lg ">Login</Link>
        <br />
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Register</Link>

        
      </div>
    </div>
  </div>
</div>
)};



export default Home;
