import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../entity/Usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit{

  usuario!: Usuario
  usuarioForm!: FormGroup
  confirmacaoSenha = ''

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required],
      confirmacaoSenha: ['', Validators.required]
    })
  }

  submitForm() {
    if(this.usuarioForm.value.senha !== this.usuarioForm.value.confirmacaoSenha) {
      alert('As senhas não coincidem')
      return;
    }
  }


}
