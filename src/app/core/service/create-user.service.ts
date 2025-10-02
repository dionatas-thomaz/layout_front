import { environment } from '@/environments/environments.local';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../types/user.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateUserService {
    private API_URL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    register(nome: string, email: string, senha: string, cpf: string): Observable<User> {
        const body = { nome, email, senha, cpf };
        return this.http.post<User>(`${this.API_URL}/api/usuarios`,body);
    }
}