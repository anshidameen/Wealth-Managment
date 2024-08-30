import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{

  constructor(private apiService: ApiService, private router: Router) { }
  
 
  canActivate(): boolean {
    if(this.apiService.isLoggedIn()){
      return true; 
    }else{
      this.router.navigate(['login']);
      return false; 
    }
  }
  
}
