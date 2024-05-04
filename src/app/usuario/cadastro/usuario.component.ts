import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../entity/Usuario';
import { UsuarioService } from '../usuario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSnackBarModule, HttpClientModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})


export class UsuarioComponent implements OnInit{

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  }
  usuarioForm!: FormGroup
  confirmacaoSenha = ''

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),  Validators.pattern('^[A-Za-zÀ-ÿ ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmacaoSenha: ['', Validators.required]
    }, {validator: this.confirmarSenhaValidacao});
  }


  cadastrarUsuario(): void {
    this.usuarioService.cadastrar(this.usuario).subscribe(() => {
      this.usuarioService.showMessage('Usuário cadastrado com sucesso!');
    }
  )
  }

  confirmarSenhaValidacao(control: FormGroup) {
    const senha = control.get('senha');
    const confirmacaoSenha = control.get('confirmacaoSenha');

    if (senha && confirmacaoSenha && senha.value !== confirmacaoSenha.value) {
      return { 'senhaNaoCoincide': true };
    } else {
      return null;
    }
  }

  submitForm() {
    if(this.usuarioForm.valid) {
      this.router.navigate(['/usuarios']);
    }
  }


}
