import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Torna o componente independente
  imports: [CommonModule, FormsModule], // Importa FormsModule localmente
})
export class HomeComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  newUser: any = { name: '', email: '' };
  isEditing: boolean = false;
  editingUserId: number | null = null;

  modal: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('userModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
    }
  }

  loadUsers() {
    this.usuarioService.findAllusers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }

  openModal() {
    this.newUser = { name: '', email: '' };
    this.isEditing = false;
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.email) return;

    this.usuarioService.createUser(this.newUser).subscribe({
      next: (data) => {
        this.users.push(data);
        this.closeModal();
      },
      error: (err) => console.error('Erro ao criar usuário', err),
    });
  }

  editUser(user: any) {
    this.isEditing = true;
    this.editingUserId = user.id;
    this.newUser = { name: user.name, email: user.email };
    this.modal.show();
  }

  updateUser() {
    if (!this.newUser.name || !this.newUser.email) return;

    if (this.editingUserId) {
      this.usuarioService.updateUser(this.editingUserId, this.newUser).subscribe({
        next: (data) => {
          const index = this.users.findIndex((user) => user.id === this.editingUserId);
          this.users[index] = data;
          this.closeModal();
        },
        error: (err) => console.error('Erro ao atualizar usuário', err),
      });
    }
  }

  deleteUser(id: number) {
    this.usuarioService.deleteUser(id).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== id);
      },
      error: (err) => console.error('Erro ao deletar usuário', err),
    });
  }

  resetForm() {
    this.isEditing = false;
    this.editingUserId = null;
    this.newUser = { name: '', email: '' };
  }
}
