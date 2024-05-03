import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioComponent } from './usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve validar o formulário corretamente', () => {

    const nome = component.usuarioForm.controls['nome'];
    const email = component.usuarioForm.controls['email'];
    const senha = component.usuarioForm.controls['senha'];
    const confirmacaoSenha = component.usuarioForm.controls['confirmacaoSenha'];

    // Definindo valores inválidos.

    nome.setValue('');
    email.setValue('emailInvalido');
    senha.setValue('');
    confirmacaoSenha.setValue('');

    // Verificando as validações

    expect(nome.valid).toBeFalsy();
    expect(email.valid).toBeFalsy();
    expect(senha.valid).toBeFalsy();
    expect(confirmacaoSenha.valid).toBeFalsy();

    // Definindo valores válidos

    nome.setValue('testeUsuario');
    email.setValue('testeusuario@gmail.com');
    senha.setValue('123456');
    confirmacaoSenha.setValue('123456');

    // Verificando as validações
    expect(nome.valid).toBeTruthy();
    expect(email.valid).toBeTruthy();
    expect(senha.valid).toBeTruthy();
    expect(confirmacaoSenha.valid).toBeTruthy();

  });

  it('deve desabilitar o botão de envio se o formulario for inválido', () => {
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    const nome = component.usuarioForm.controls['nome'];
    const email = component.usuarioForm.controls['email'];
    const senha = component.usuarioForm.controls['senha'];
    const confirmacaoSenha = component.usuarioForm.controls['confirmacaoSenha'];

    // Definindo valores inválidos
    nome.setValue('');
    email.setValue('emailInvalido');
    senha.setValue('');
    confirmacaoSenha.setValue('');

    // Atualizando a exibição
    fixture.detectChanges;

    // Verificando se o botão está desabilitado
    expect(submitButton.disabled).toBeTruthy();

    // Definindo valores válidos
    nome.setValue('testesteUsuario');
    email.setValue('testeUsuario@gmail.com');
    senha.setValue('123456');
    confirmacaoSenha.setValue('123456');

    // Atualizando a exibição novamente
    fixture.detectChanges();

    // Verificando se o botão está habilitado
    expect(submitButton.disabled).toBeFalsy();
  })
});
