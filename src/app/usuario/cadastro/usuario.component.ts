import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../entity/Usuario';
import { UsuarioService } from '../usuario.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSnackBarModule, HttpClientModule, CommonModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  animations: [
    trigger('successMessage', [
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-200px)'
      })),
      transition('visible => hidden', animate('1s ease-in-out')),
      transition('hidden => visible', animate('0.5s ease-in-out'))
    ])
  ]

})


export class UsuarioComponent implements OnInit{

  isMessageVisible = false;

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
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmacaoSenha: ['', Validators.required]
    }, {validator: this.confirmarSenhaValidacao});
  }


  cadastrarUsuario(): void {
    this.usuarioService.cadastrar(this.usuario).subscribe(() => {
      this.router.navigate(['/usuarios'])
      this.isMessageVisible = true;
      setTimeout(() => {
        this.isMessageVisible = false;
      }, 2000);
    })
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

    }
  }


}
