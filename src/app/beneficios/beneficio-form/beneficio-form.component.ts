import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BeneficiosService } from "../beneficios.service";
import { RouterModule, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-beneficio-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './beneficio-form.component.html',
  styleUrls: [],
})
export class BeneficioFormComponent implements OnInit {
  beneficioForm!: FormGroup;
  idsRemisiones: string[] = [];

  constructor(
    private fb: FormBuilder,
    private beneficioService: BeneficiosService,
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

    // Cargar lista de ID de remisión desde el backend
    this.beneficioService.listarTodasLasRemisiones().subscribe(data => {
      this.idsRemisiones = data;
    })
  }

  onSubmit() {
    if (this.beneficioForm.valid) {
      let formData = { ...this.beneficioForm.value };

      // Formatear la fecha a 'YYYY-MM-DD HH:mm'
      const fecha = new Date(formData.hora_beneficio);
      formData.hora_beneficio = fecha.toISOString().slice(0, 16).replace("T", " ");

      this.beneficioService.crearBeneficio(formData).subscribe(
        response => {
          console.log('Guardado:', response);
          this.beneficioForm.reset();
          this.router.navigate(['/beneficios/resumen']); // Navegar a beneficio-resumen
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      // Marcar todos los campos como tocados para mostrar errores
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
}
