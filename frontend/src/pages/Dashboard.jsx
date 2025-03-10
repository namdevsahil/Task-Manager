import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notification, setNotification] = useState(null);

  // ✅ Fetch Tasks from Backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/tasks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTasks(response.data);
      } catch (error) {
        console.error("❌ Error Fetching Tasks:", error);
      }
    };

    fetchTasks();
  }, [navigate]);

  // ✅ Filter Tasks Based on Status
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === statusFilter));
    }
  }, [tasks, statusFilter]);

  // ✅ Show Notifications
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // ✅ Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      showNotification("Please fill all fields!", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5001/api/tasks/create",
        { title, description, dueDate, status: "pending" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks([...tasks, response.data.task]);
      setTitle("");
      setDescription("");
      setDueDate("");
      showNotification("Task created successfully!");
    } catch (error) {
      console.error("❌ Error Creating Task:", error);
      showNotification("Task creation failed!", "error");
    }
  };

  // ✅ Update Task
  const handleUpdateTask = async (taskId) => {
    const updatedTitle = prompt("Enter new title:");
    const updatedDescription = prompt("Enter new description:");
    const updatedStatus = prompt("Enter new status (pending/completed):");

    if (!updatedTitle || !updatedDescription || !updatedStatus) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5001/api/tasks/${taskId}`,
        { title: updatedTitle, description: updatedDescription, status: updatedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTasks(tasks.map((task) => (task._id === taskId ? response.data.task : task)));
      showNotification("Task updated successfully!");
    } catch (error) {
      console.error("❌ Error Updating Task:", error);
      showNotification("Task update failed!", "error");
    }
  };

  // ✅ Delete Task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((task) => task._id !== taskId));
      showNotification("Task deleted successfully!");
    } catch (error) {
      console.error("❌ Error Deleting Task:", error);
      showNotification("Task deletion failed!", "error");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Notification Bar */}
      {notification && (
  <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-white text-lg font-semibold shadow-lg ${
    notification.type === "error" ? "bg-red-600" : "bg-green-600"
  }`}>
    {notification.message}
  </div>
)}

      {/* Header with Logout */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Task Creation Form */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            Create Task
          </button>
        </form>
      </div>

      {/* Filter Tasks */}
      <div className="w-full max-w-4xl mb-4">
        <select className="p-2 border border-gray-300 rounded" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Display Tasks */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
        {filteredTasks.length === 0 ? (
          <p className="text-gray-600 text-center">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-lg shadow-md border mb-4">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toDateString()}</p>
              <p className={`mt-2 px-2 py-1 rounded-md text-white ${task.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                {task.status}
              </p>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded mt-2" onClick={() => handleUpdateTask(task._id)}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded ml-2 mt-2" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const TaskManager = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">Task Manager</h2>
        <input type="text" placeholder="Add a task" className="w-full p-2 mt-4 border rounded-md" />
        <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600">
          Add Task
        </button>
      </div>
    </div>
  );
};


export default Dashboard;
