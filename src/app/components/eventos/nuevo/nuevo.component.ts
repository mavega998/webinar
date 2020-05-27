import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  evento: FormGroup;
  entidades: any[];
  areas: any[];
  file;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.evento = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaIni: ['', Validators.required],
      horaIni: ['', Validators.required],
      fechaFin: ['', Validators.required],
      horaFin: ['', Validators.required],
      estado: [true],
      enlace: [''],
      grabacion: [''],
      entidad: ['', Validators.required],
      dependencia: [''],
      responsable: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      inscripcion: [''],
      area: [0],
      file: null
    });
  }

  ngOnInit() {
    this.loadEntidades();
    this.loadAreas();
  }

  loadEntidades() {
    this.apiService.getEntidades().subscribe((data: any) => {
      this.entidades = data.msg;
    });
  }

  loadAreas() {
    this.apiService.getAreas().subscribe((data: any) => {
      this.areas = data.msg;
    });
  }

  get form() {
    return this.evento.controls;
  }

  save() {
    const eventAux = {
      nombre: this.evento.get('nombre').value,
      descripcion: this.evento.get('descripcion').value,
      fechainicio: this.evento.get('fechaIni').value + 'T' + this.evento.get('horaIni').value + ':00',
      fechafin: this.evento.get('fechaFin').value + 'T' + this.evento.get('horaFin').value + ':00',
      estado: this.evento.get('estado').value ? 1 : 0,
      enlace: this.evento.get('enlace').value,
      grabacion: this.evento.get('grabacion').value,
      entidad: Number(this.evento.get('entidad').value),
      dependencia: this.evento.get('dependencia').value,
      responsable: this.evento.get('responsable').value,
      email: this.evento.get('email').value,
      telefono: this.evento.get('telefono').value,
      inscripcion: this.evento.get('inscripcion').value,
      area: this.evento.get('area').value ? Number(this.evento.get('area').value) : this.evento.get('area').value,
      file: this.evento.get('file').value
    };

    this.apiService.postEvento(eventAux).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      }).then((info) => {
        this.router.navigateByUrl('/eventos');
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.error.msg.sqlMessage,
      });
    });
  }

  fileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.evento.get('file').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        });
      };
    }
  }
}
