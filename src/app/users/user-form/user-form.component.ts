import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: []
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Verificar si estamos en modo edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.loadUser(this.userId);
    }
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]],
      rol: ['user', Validators.required],
      estado: [true, Validators.required]
    });
  }

  private loadUser(id: number): void {
    this.loading = true;
    this.usersService.getUser(id).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol,
          estado: user.estado
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.errorMessage = 'Error al cargar el usuario. Por favor, intente de nuevo.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;
    const userData = this.userForm.value;

    // Si estamos editando y no se proporcionó una nueva contraseña, la eliminamos del objeto
    if (this.isEditMode && !userData.password) {
      delete userData.password;
    }

    const request = this.isEditMode && this.userId
      ? this.usersService.updateUser(this.userId, userData)
      : this.usersService.createUser(userData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/users/resumen']);
      },
      error: (error) => {
        console.error('Error saving user:', error);
        this.errorMessage = 'Error al guardar el usuario. Por favor, intente de nuevo.';
        this.loading = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/users']);
  }
}