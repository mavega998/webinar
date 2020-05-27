import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoe',
  templateUrl: './nuevoe.component.html',
  styleUrls: ['./nuevoe.component.css']
})
export class NuevoeComponent implements OnInit {
  entidad: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    this.entidad = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo: [''],
      ciudad: ['']
    });
  }

  ngOnInit() { }

  get form() {
    return this.entidad.controls;
  }

  save() {
    const entidadAux = {
      nombre: this.entidad.get('nombre').value,
      tipo: this.entidad.get('tipo').value !== '' ? Number(this.entidad.get('tipo').value) : null,
      ciudad: this.entidad.get('ciudad').value
    };
    this.apiService.postEntidad(entidadAux).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      }).then((info) => {
        this.router.navigateByUrl('/entidades');
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg.sqlMessage,
      });
    });
  }
}
