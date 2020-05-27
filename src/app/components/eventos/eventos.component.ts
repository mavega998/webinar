import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: any[];

  constructor(private apiService: ApiService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {
    this.loadEventos();
  }

  loadEventos() {
    this.apiService.getEventos().subscribe((data: any) => {
      this.eventos = data.msg;
    });
  }

  deleteEvento(evento) {
    this.apiService.delEvento(evento.id).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      }).then(info => {
        this.loadEventos();
      });
    })
  }

  viewEvent(evento) {
    forkJoin([
      this.apiService.getEntidad(evento.entidad),
      this.apiService.getArea(evento.area)
    ]).toPromise().then(([entidad, area]: any[]) => {
      evento.entidad = entidad.msg[0].nombre;
      evento.area = area.msg[0].descripcion;
      Swal.fire({
        title: `<strong>${evento.nombre}</strong>`,
        icon: 'info',
        html: `
        <p>${evento.descripcion}</p>
        <p>Inicia el ${this.datePipe.transform(evento.fechainicio, 'dd-MM-yyyy HH:mm a')}</p>
        <p>Termina el ${this.datePipe.transform(evento.fechainicio, 'dd-MM-yyyy HH:mm a')}</p>
        <p>Entidad: ${evento.entidad === null ? 'N/A' : evento.entidad}</p>
        <p>Dependencia: ${evento.dependencia === null || evento.dependencia === '' ? 'N/A' : evento.dependencia}</p>
        <p>Responsable: ${evento.responsable === null ? 'N/A' : evento.responsable}</p>
        <p>Correo: ${evento.email === null ? 'N/A' : evento.email}</p>
        <p>Telefono: ${evento.telefono === null ? 'N/A' : evento.telefono}</p>
        <p>Inscripción: ${evento.inscripcion === null ? 'N/A' : '<a href=' + evento.inscripcion + '></a>'}</p>
        <p>Area: ${evento.area === null ? 'N/A' : evento.area}</p>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Ir al evento',
        confirmButtonAriaLabel: 'Ir al evento',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i> Cerrar',
        cancelButtonAriaLabel: 'Thumbs down'
      });
    });
  }

  editEvent(evento) {
    this.router.navigateByUrl(`eventos/editar/${evento.id}`);
  }
}
