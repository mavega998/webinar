import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editare',
  templateUrl: './editare.component.html',
  styleUrls: ['./editare.component.css']
})
export class EditareComponent implements OnInit {

  entidadId;
  entidad: FormGroup;

  constructor(
    private activate: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.entidadId = this.activate.snapshot.params.id;
    this.entidad = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo: [''],
      ciudad: ['']
    });
  }

  ngOnInit() {
    this.loadEntidad();
  }

  loadEntidad() {
    this.apiService.getEntidad(this.entidadId).subscribe((data: any) => {
      const entidadAux = data.msg[0];
      this.entidad.get('nombre').setValue(entidadAux.nombre);
      this.entidad.get('tipo').setValue(entidadAux.tipo);
      this.entidad.get('ciudad').setValue(entidadAux.ciudad);
    });
  }

  get form() {
    return this.entidad.controls;
  }

  save() {
    const entidadAux = {
      nombre: this.entidad.get('nombre').value,
      tipo: this.entidad.get('tipo').value !== '' ? Number(this.entidad.get('tipo').value) : null,
      ciudad: this.entidad.get('ciudad').value
    };
    this.apiService.putEntidad(this.entidadId, entidadAux).subscribe(
      (data: any) => {
        Swal.fire({
          icon: 'success',
          title: data.msg,
          showConfirmButton: false,
          timer: 1500
        }).then((info) => {
          this.router.navigateByUrl('/entidades');
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg.sqlMessage
        });
      }
    );
  }
}
