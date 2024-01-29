import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import {HttpClient} from "@angular/common/http";

export function authenticationGuard(): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isAuthenticated()) {
      router.navigate(['login']);
      console.log("not authenticated");
      return false;
    }
    console.log("authenticated");
    return true;
  }
}
