import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, Toast],
    providers: [DialogService, MessageService],
    template: `
        <p-toast />
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];
    hasStock = false;
    hasService = false;
    hasFinance = false;
    ref: DynamicDialogRef | undefined;

    constructor(
      //  private tokenService: TokenService,
        private router: Router,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {
        // this.hasStock = tokenService.hasStock();
        // this.hasService = tokenService.hasService();
        // this.hasFinance = tokenService.hasFinance();
    }

    logout() {
       // this.tokenService.remove();
        this.router.navigate(['/auth/login']);
    }

    ngOnInit() {
        this.model = [
            {
                                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
           
                // label: 'Estoque',
                // visible: this.hasStock,
                // items: [
                //     { label: 'Vendas', icon: 'pi pi-shopping-cart', routerLink: ['/estoque/vendas'] },
                //     { label: 'Produtos', icon: 'pi pi-tag', routerLink: ['/estoque/produtos'] }
                // ]
            },
            {
                // label: 'Serviço',
                // visible: this.hasService,
                // items: [{ label: 'Serviço', icon: 'pi pi-warehouse', routerLink: ['/servico/servicos'] }]
            },
            {
                // label: 'Financeiro',
                // icon: 'pi pi-fw pi-briefcase',
                // visible: this.hasFinance,
                // items: [
                //     { label: 'Contas a pagar', icon: 'pi pi-money-bill', routerLink: ['/financeiro/contas-pagar'] },
                //     { label: 'Contas a receber', icon: 'pi pi-wallet', routerLink: ['/financeiro/contas-receber'] }
                // ]
            },
            {
                label: 'Útilitários',
                items: [
                    // {
                    //     label: 'Configurações',
                    //     icon: 'pi pi-cog',
                    //     items: [
                    //         {
                    //             label: 'Dashboard',
                    //             icon: 'pi pi-chart-pie',
                    //             routerLink: ['/configuracao/graficos']
                    //         }
                    //     ]
                    // },
                ]
            },
            {
                label: 'Sair',
                items: [{ label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }]
            }
        ];
    }
}
