import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/Usuario';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = "http://localhost:8080/usuario"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro ao cadastrar usuário.';
        if (error.status === 400) {
          errorMessage = `Já existe um usuário cadastrado com o nome ${usuario.nome}`;
        }

        if (error.status === 400) {
          errorMessage = `Já existe um usuário cadastrado com o email ${usuario.email}`;
        }
        console.error(`Erro código ${error.status}, body foi: `, error.error);
        this.showMessage(errorMessage, true);
        return throwError('Erro de cadastro de usuário');
      })
    );
  }



}
