import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BeneficiosService } from "../beneficios.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-beneficio-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './beneficio-form.component.html',
  styleUrls: [],
})
export class BeneficioFormComponent implements OnInit {
  beneficioForm!: FormGroup;
  remisiones: { id_remision: string }[] = [];

  constructor(
    private fb: FormBuilder, // Inyección de FormBuilder
    private beneficiosService: BeneficiosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.beneficioForm = this.fb.group({
      hora_beneficio: ['', [Validators.required]],
      id_remision: ['', [Validators.required]],
      id_empresa: ['', [Validators.required]],
      region_procedencia: ['', [Validators.required]],
      granja: ['', [Validators.required]],
      galpon: ['', [Validators.required]],
      linea_aves: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      edad: [null, [Validators.required]],
      peso_promedio_ave_granja: [null, [Validators.required]],
      placa_vehiculo: ['', [Validators.required]],
      id_conductor: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      id_plan_sanitario: ['', [Validators.required]],
      tp_profesional_granja: ['', [Validators.required]],
      nombre_profesional: ['', [Validators.required]],
      tp_profesional_planta: ['', [Validators.required]],
      nombre_auditor: ['', [Validators.required]],
      aves_por_guacal: [null, [Validators.required]],
      guacales_vacios: [null, [Validators.required]],
      guacales_usados: [null, [Validators.required]],
      guacal_extra: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
      aves_remisionadas: [null, [Validators.required]],
      aves_colgadas: [null, [Validators.required]],
      aves_asfixiadas: [null, [Validators.required]],
      aves_decomisadas: [null, [Validators.required]],
      aves_destrozadas: [null, [Validators.required]],
      aves_en_guacal_extra: [null, [Validators.required]],
      peso_1_guacal_vacio: [null, [Validators.required]],
      peso_torre_7_guacales: [null, [Validators.required]],
    });

    this.obtenerRemisiones();
  }

  onSubmit() {
    if (this.beneficioForm.valid) {
      const formData = { ...this.beneficioForm.value };

      // Formatear la fecha a 'YYYY-MM-DD HH:mm'
      const fecha = new Date(formData.hora_beneficio);
      formData.hora_beneficio = fecha.toISOString().slice(0, 16).replace("T", " ");

      this.beneficiosService.createBeneficio(formData).subscribe({
        next: () => {
          this.beneficioForm.reset();
          this.router.navigate(['/beneficios/resumen']);
        },
        error: (error) => {
          console.error('Error al guardar beneficio:', error);
        }
      });
    } else {
      Object.keys(this.beneficioForm.controls).forEach(key => {
        const control = this.beneficioForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancelar() {
    this.beneficioForm.reset();
    this.router.navigate(['/beneficios']);
  }

  obtenerRemisiones() {
    this.beneficiosService.listarTodasLasRemisiones().subscribe({
      next: (data) => {
        this.remisiones = data;
      },
      error: (error) => {
        console.error('Error al obtener remisiones:', error);
      }
    });
  }
}
