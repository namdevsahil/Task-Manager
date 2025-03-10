import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="p-3 flex justify-between items-center bg-gray-100 rounded">
              <span className={task.completed ? "line-through text-gray-500" : "text-gray-900"}>
                {task.title}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(task)}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No tasks available.</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
