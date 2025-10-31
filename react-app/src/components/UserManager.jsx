import { useState, useEffect } from "react";
import "./UserManager.css";

const API_URL = "http://localhost:3001";

function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editingId, setEditingId] = useState(null);

  // GET - Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // POST - Create new user
  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      await fetchUsers();
      setFormData({ name: "", email: "", role: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // PUT - Update user
  const updateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: editingId }),
      });
      if (!response.ok) throw new Error("Failed to update user");
      await fetchUsers();
      setFormData({ name: "", email: "", role: "" });
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", email: "", role: "" });
  };

  const handleSubmit = editingId ? updateUser : createUser;

  return (
    <div className="user-manager">
      <h2>👥 User Management (CRUD Operations)</h2>

      {error && (
        <div className="error" data-testid="error-message">
          Error: {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="user-form"
        data-testid="user-form"
      >
        <h3>{editingId ? "Edit User" : "Add New User"}</h3>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          data-testid="input-name"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          data-testid="input-email"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
          data-testid="input-role"
        />
        <div className="form-actions">
          <button type="submit" disabled={loading} data-testid="submit-button">
            {loading ? "Processing..." : editingId ? "Update User" : "Add User"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              data-testid="cancel-button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="users-list">
        <h3>Users List</h3>
        {loading && <p>Loading...</p>}
        {users.length === 0 && !loading && <p>No users found</p>}
        <div className="users-grid" data-testid="users-list">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card"
              data-testid={`user-${user.id}`}
            >
              <h4>{user.name}</h4>
              <p>📧 {user.email}</p>
              <p>💼 {user.role}</p>
              <div className="card-actions">
                <button
                  onClick={() => startEdit(user)}
                  className="btn-edit"
                  data-testid={`edit-user-${user.id}`}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn-delete"
                  data-testid={`delete-user-${user.id}`}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManager;
