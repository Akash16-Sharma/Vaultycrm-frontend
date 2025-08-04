import { useState, useEffect } from "react";
import axios from "axios";
import AddProjectModal from "../components/AddProjectModal";
import EditProjectModal from "../components/EditProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Project
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100 text-sm uppercase text-gray-600">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-t text-sm">
              <td className="p-2">{project.title}</td>
              <td className="p-2">{project.description}</td>
              <td className="p-2 capitalize">{project.status}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => setEditProject(project)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onProjectAdded={fetchProjects}
        />
      )}

      {/* Edit Modal */}
      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onProjectUpdated={fetchProjects}
        />
      )}
    </div>
  );
};

export default Projects;
