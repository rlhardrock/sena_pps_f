import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BeneficiosService} from "../beneficios.service";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-beneficio-form',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './beneficio-form.component.html',
  styleUrls: ['./beneficio-form.component.css']
})
export class BeneficioFormComponent implements OnInit {
  beneficioForm!: FormGroup;
  idsRemisiones: string[] = [];

  constructor(private fb: FormBuilder, private beneficioService: BeneficiosService) {}

  ngOnInit(): void {
    this.beneficioForm = this.fb.group({
      id_remision: ['', [Validators.required]],
      id_empresa: ['', [Validators.required]],
      region_procedencia: ['', [Validators.required]],
      granja: ['', [Validators.required]],
      galpon: ['', [Validators.required]],
      linea_aves: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      peso_promedio_ave_granja: ['', [Validators.required]],
      placa_vehiculo: ['', [Validators.required]],
      id_conductor: ['', [Validators.required]],
      nombre_conductor: ['', [Validators.required]],
      id_plan_sanitario: ['', [Validators.required]],
      tp_profesional_granja: ['', [Validators.required]],
      nombre_profesional: ['', [Validators.required]],
      tp_profesional_planta: ['', [Validators.required]],
      nombre_auditor: ['', [Validators.required]],
      hora_beneficio: ['', [Validators.required]],
      aves_por_guacal: ['', [Validators.required]],
      guacales_vacios: ['', [Validators.required]],
      guacales_usados: ['', [Validators.required]],
      guacal_extra: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
      aves_remisionadas: ['', [Validators.required]],
      aves_colgadas: ['', [Validators.required]],
      aves_asfixiadas: ['', [Validators.required]],
      aves_en_guacal_extra: ['', [Validators.required]],
      peso_1_guacal_vacio: ['', [Validators.required]],
      peso_torre_7_guacales: ['', [Validators.required]],
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

      this.beneficioService.crearBeneficio(this.beneficioForm.value).subscribe(
        response => {
          console.log('Guardado:', response);
          this.beneficioForm.reset();
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
}
