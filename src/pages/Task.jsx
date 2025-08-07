import { useEffect, useState } from "react";
import axios from "axios";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProjects(res.data);
      if (res.data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(res.data[0]._id);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
      toast.error("Failed to load projects");
    }
  };

  const fetchTasks = async () => {
    if (!selectedProjectId) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${selectedProjectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      let filtered = res.data;
      if (filterStatus !== "All") {
        filtered = filtered.filter((t) => t.status === filterStatus);
      }

      setTasks(filtered);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      toast.error("Failed to load tasks");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Delete failed");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Status updated");
      fetchTasks();
    } catch (err) {
      console.error("Status update failed", err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedProjectId, filterStatus]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="mt-2 p-2 border rounded"
          >
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-t">
              <td className="p-2">{task.title}</td>
              <td className="p-2">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="Todo">Todo</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </td>
              <td className="p-2">{task.description}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => setEditTask(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddTaskModal
          projectId={selectedProjectId}
          onClose={() => setShowAddModal(false)}
          onTaskAdded={fetchTasks}
        />
      )}

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onTaskUpdated={fetchTasks}
        />
      )}
    </div>
  );
};

export default Task;
