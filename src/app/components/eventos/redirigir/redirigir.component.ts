import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-redirigir',
  templateUrl: './redirigir.component.html',
  styleUrls: ['./redirigir.component.css']
})
export class RedirigirComponent implements OnInit {

  parametro;

  constructor(private activate: ActivatedRoute, private apiService: ApiService, private router: Router) {
    this.parametro = this.activate.snapshot.params.id;
  }

  ngOnInit() {
    this.apiService.getRedirectEvent(this.parametro).subscribe((data: any) => {
      if (data.msg.length === 0) {
        this.router.navigateByUrl('/inicio');
      }
      const evento = data.msg[0];
      if (evento.enlace && evento.enlace !== '') {
        window.open(evento.enlace, '_self');
      } else if (evento.grabacion && evento.grabacion !== '') {
        window.open(evento.grabacion, '_self');
      }
    });
  }

}
