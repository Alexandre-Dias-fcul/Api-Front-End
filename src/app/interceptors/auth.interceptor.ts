import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthorizationService } from '../services/back-office/authorization.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Injeta o serviço AuthorizationService
  const authService = inject(AuthorizationService);

  const token = authService.getToken();

  if (token) {
    // Clona a requisição e adiciona o cabeçalho de autorização
    const cloned = req.clone(
      {
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });

    return next(cloned);
  }
  // Se não houver token, apenas passa a requisição original
  return next(req);
};
