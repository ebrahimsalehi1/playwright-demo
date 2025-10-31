<template>
  <div class="user-manager">
    <h2>👥 User Management (CRUD Operations)</h2>

    <div v-if="error" class="error" data-testid="error-message">
      Error: {{ error }}
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="user-form"
      data-testid="user-form"
    >
      <h3>{{ editingId ? "Edit User" : "Add New User" }}</h3>
      <input
        type="text"
        placeholder="Name"
        v-model="formData.name"
        required
        data-testid="input-name"
      />
      <input
        type="email"
        placeholder="Email"
        v-model="formData.email"
        required
        data-testid="input-email"
      />
      <input
        type="text"
        placeholder="Role"
        v-model="formData.role"
        required
        data-testid="input-role"
      />
      <div class="form-actions">
        <button type="submit" :disabled="loading" data-testid="submit-button">
          {{
            loading ? "Processing..." : editingId ? "Update User" : "Add User"
          }}
        </button>
        <button
          v-if="editingId"
          type="button"
          @click="cancelEdit"
          data-testid="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>

    <div class="users-list">
      <h3>Users List</h3>
      <p v-if="loading">Loading...</p>
      <p v-if="users.length === 0 && !loading">No users found</p>
      <div class="users-grid" data-testid="users-list">
        <div
          v-for="user in users"
          :key="user.id"
          class="user-card"
          :data-testid="`user-${user.id}`"
        >
          <h4>{{ user.name }}</h4>
          <p>📧 {{ user.email }}</p>
          <p>💼 {{ user.role }}</p>
          <div class="card-actions">
            <button
              @click="startEdit(user)"
              class="btn-edit"
              :data-testid="`edit-user-${user.id}`"
            >
              ✏️ Edit
            </button>
            <button
              @click="deleteUser(user.id)"
              class="btn-delete"
              :data-testid="`delete-user-${user.id}`"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL = "http://localhost:3001";

const users = ref([]);
const loading = ref(false);
const error = ref(null);
const formData = ref({
  name: "",
  email: "",
  role: "",
});
const editingId = ref(null);

// GET - Fetch all users
const fetchUsers = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    users.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});

// POST - Create new user
const createUser = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });
    if (!response.ok) throw new Error("Failed to create user");
    await fetchUsers();
    resetForm();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// PUT - Update user
const updateUser = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${API_URL}/users/${editingId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData.value, id: editingId.value }),
    });
    if (!response.ok) throw new Error("Failed to update user");
    await fetchUsers();
    resetForm();
    editingId.value = null;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// DELETE - Delete user
const deleteUser = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    await fetchUsers();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const startEdit = (user) => {
  editingId.value = user.id;
  formData.value = {
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const cancelEdit = () => {
  editingId.value = null;
  resetForm();
};

const resetForm = () => {
  formData.value = {
    name: "",
    email: "",
    role: "",
  };
};

const handleSubmit = () => {
  if (editingId.value) {
    updateUser();
  } else {
    createUser();
  }
};
</script>

<style scoped>
.user-manager {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.user-manager h2 {
  text-align: center;
  color: #646cff;
  margin-bottom: 30px;
}

.error {
  background-color: #fee;
  color: #c00;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #fcc;
}

.user-form {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.user-form h3 {
  margin-top: 0;
  color: #646cff;
}

.user-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 16px;
  box-sizing: border-box;
}

.user-form input:focus {
  outline: none;
  border-color: #646cff;
}

.form-actions {
  display: flex;
  gap: 10px;
}

.form-actions button {
  flex: 1;
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.form-actions button[type="submit"] {
  background-color: #646cff;
  color: white;
}

.form-actions button[type="submit"]:hover:not(:disabled) {
  background-color: #535bf2;
}

.form-actions button[type="submit"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-actions button[type="button"] {
  background-color: #888;
  color: white;
}

.form-actions button[type="button"]:hover {
  background-color: #666;
}

.users-list h3 {
  color: #646cff;
  margin-bottom: 20px;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.user-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.user-card h4 {
  margin: 0 0 10px 0;
  color: #646cff;
}

.user-card p {
  margin: 5px 0;
  color: rgba(255, 255, 255, 0.87);
}

.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.card-actions button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-edit {
  background-color: #4caf50;
  color: white;
}

.btn-edit:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #da190b;
}
</style>
