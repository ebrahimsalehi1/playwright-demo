import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user';

@Component({
  selector: 'app-user-manager',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-manager.html',
  styleUrl: './user-manager.css',
})
export class UserManager implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  formData: User = {
    name: '',
    email: '',
    role: '',
  };
  editingId: number | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // GET - Fetch all users
  fetchUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  // POST - Create new user
  createUser(): void {
    this.loading = true;
    this.error = null;
    this.userService.createUser(this.formData).subscribe({
      next: () => {
        this.fetchUsers();
        this.resetForm();
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  // PUT - Update user
  updateUser(): void {
    if (this.editingId === null) return;

    this.loading = true;
    this.error = null;
    this.userService
      .updateUser(this.editingId, { ...this.formData, id: this.editingId })
      .subscribe({
        next: () => {
          this.fetchUsers();
          this.resetForm();
          this.editingId = null;
        },
        error: (err) => {
          this.error = err.message;
          this.loading = false;
        },
      });
  }

  // DELETE - Delete user
  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.loading = true;
    this.error = null;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  startEdit(user: User): void {
    this.editingId = user.id!;
    this.formData = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  cancelEdit(): void {
    this.editingId = null;
    this.resetForm();
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      role: '',
    };
  }

  onSubmit(): void {
    if (this.editingId) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
}
