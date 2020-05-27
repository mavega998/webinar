import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginGuard {

  constructor(private router: Router) { }

  canActivate() {
    const token = localStorage.getItem('usuario');
    if (!token) {
      this.router.navigateByUrl('/home');
      localStorage.removeItem('usuario');
      return false;
    }
    return true;
  }
}
