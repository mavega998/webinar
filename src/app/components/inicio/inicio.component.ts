import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  eventos: any[];

  constructor(private apiService: ApiService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.apiService.getEventos().subscribe((ev: any) => {
      this.eventos = ev.msg;
    });
  }

  showEvent(evento) {
    Swal.fire({
      title: `<strong>${evento.nombre}</strong>`,
      icon: 'info',
      html: `
      <p>${evento.descripcion}</p>
      <p>Inicia el ${this.datePipe.transform(evento.fechainicio, 'dd-MM-yyyy HH:mm a')}</p>
      <p>Termina el ${this.datePipe.transform(evento.fechainicio, 'dd-MM-yyyy HH:mm a')}</p>
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
    }).then(data => {
      if (data.isConfirmed) {
        if (evento.enlace && evento.enlace !== '') {
          window.open(evento.enlace, '_blank');
        } else if (evento.grabacion && evento.grabacion !== '') {
          window.open(evento.grabacion, '_blank');
        }
      }
    });
  }

}
