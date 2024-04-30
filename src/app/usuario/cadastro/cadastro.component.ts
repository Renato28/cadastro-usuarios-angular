import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../entity/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{

  usuario: Usuario = {
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  }
  usuarioForm!: FormGroup
  confirmacaoSenha = ''

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required, Validators.minLength(6), Validators.maxLength(20)],
      confirmacaoSenha: ['', Validators.required]
    }, {validator: this.confirmarSenhaValidacao});
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
