import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { CreateUserService } from '@/core/service/create-user.service';
import { MessageService } from 'primeng/api';
import { TokenService } from '@/core/service/token.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
    providers: [MessageService],
    template: `
     <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-col items-center justify-center">
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
            <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                <div class="text-center mb-8">
                    <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bem vindo!</div>
                    <span class="text-muted-color font-medium">Entre para continuar</span>
                </div>

                <div>
                    <form #exampleForm="ngForm" (ngSubmit)="login(exampleForm)">
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <input pInputText id="email1" type="text" placeholder="Email" class="w-full md:w-120 mb-8"
                               [(ngModel)]="email" name="email" required />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Senha</label>
                        <p-password id="password1" [(ngModel)]="password" name="password" placeholder="Senha"
                                    [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false" required></p-password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <p-checkbox [(ngModel)]="checked" name="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                <label for="rememberme1">Lembre-se de mim</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Esqueceu a Senha?</span>
                        </div>

                        <p-button label="Entrar" type="submit" styleClass="w-full"></p-button>
                    </form>

                    <div class="flex items-center mt-8 mb-8 gap-4 justify-end">
                        <label>Ainda não tem conta?</label>
                        <p-button label="Cadastre-se" styleClass="w-full" routerLink="/auth/register"></p-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `
})
export class Login {
    email: string = '';
    password: string = '';
    checked: boolean = false;
    loading: boolean = false;

    constructor(
        private createUserService: CreateUserService,
        private messageService: MessageService,
        private tokenService: TokenService
    ) {}

    login(form: any): void {
        if (form.valid) {
            this.loading = true;
            this.createUserService.login(this.email, this.password).subscribe(
                (res) => {
                    this.tokenService.save(res);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Login realizado com sucesso'
                    });
                    form.resetForm();
                    this.loading = false;
                },
                (err) => {
                    this.loading = false;
                    const mensagem = err.error?.mensagem || 'Erro inesperado.';
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro ao Logar',
                        detail: mensagem
                    });
                }
            );
        }
    }
}
