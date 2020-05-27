import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  eventos: any[];
  search: FormGroup;

  constructor(private apiService: ApiService, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.search = this.formBuilder.group({
      nombre: ['']
    });

    this.search.get('nombre').valueChanges.subscribe(data => {
      if (data.length > 2) {
        this.buscarEvento();
      }
      if (data === '') {
        this.loadEvents();
      }
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.apiService.getEventos().subscribe((ev: any) => {
      this.eventos = ev.msg;
      this.eventos.forEach(evento => {
        evento.img = 'data:image/jpeg;base64,' + evento.img;
      });
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

  buscarEvento() {
    this.apiService.findEvento(this.search.value).subscribe((data: any) => {
      this.eventos = data.msg;
      this.eventos.forEach(evento => {
        evento.img = 'data:image/jpeg;base64,' + evento.img;
      });
    });
  }
}
