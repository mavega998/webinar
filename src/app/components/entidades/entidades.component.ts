import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

  entidades: any[];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.loadEntidades();
  }

  loadEntidades() {
    this.apiService.getEntidades().subscribe((data: any) => {
      this.entidades = data.msg;
    });
  }

  deleteEntidad(entidad) {
    this.apiService.delEntidad(entidad.id).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
      }).then(info => {
        this.loadEntidades();
      });
    });
  }

  viewEntidad(entidad) {
    Swal.fire({
      title: `<strong>${entidad.nombre}</strong>`,
      icon: 'info',
      html: `
      <p>Tipo: ${entidad.tipo}</p>
      <p>Ciudad: ${entidad.ciudad}</p>
      `,
    });
  }

  editEntidad(entidad) {
    this.router.navigateByUrl(`entidades/editar/${entidad.id}`);
  }
}
