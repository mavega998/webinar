import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  eventoId;
  evento: FormGroup;
  entidades: any[];
  areas: any[];
  file;

  constructor(
    private activate: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    this.eventoId = this.activate.snapshot.params.id;
    this.evento = this.formBuilder.group({
      nombre: [{value: '', disable: true}, Validators.required],
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
    this.loadEvento();
    this.loadEntidades();
    this.loadAreas();
  }

  loadEvento() {
    this.apiService.getEvento(this.eventoId).subscribe((data: any) => {
      const eventoAux = data.msg[0];
      this.evento.get('nombre').setValue(eventoAux.nombre);
      this.evento.get('descripcion').setValue(eventoAux.descripcion);
      this.evento.get('fechaIni').setValue(this.datePipe.transform(eventoAux.fechainicio, 'yyyy-MM-dd'));
      this.evento.get('horaIni').setValue(this.datePipe.transform(eventoAux.fechainicio, 'hh:mm'));
      this.evento.get('fechaFin').setValue(this.datePipe.transform(eventoAux.fechafin, 'yyyy-MM-dd'));
      this.evento.get('horaFin').setValue(this.datePipe.transform(eventoAux.fechafin, 'hh:mm'));
      this.evento.get('enlace').setValue(eventoAux.enlace);
      this.evento.get('grabacion').setValue(eventoAux.grabacion);
      this.evento.get('entidad').setValue(eventoAux.entidad);
      this.evento.get('dependencia').setValue(eventoAux.dependencia);
      this.evento.get('responsable').setValue(eventoAux.responsable);
      this.evento.get('email').setValue(eventoAux.email);
      this.evento.get('telefono').setValue(eventoAux.telefono);
      this.evento.get('inscripcion').setValue(eventoAux.inscripcion);
      this.evento.get('area').setValue(eventoAux.area);
    });
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
    this.apiService.putEvento(this.eventoId, eventAux).subscribe((data: any) => {
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
