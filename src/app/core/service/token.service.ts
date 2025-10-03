import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';

enum StorageKeys {
  TOKEN = 'token'
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  save(token: string | { access_token: string }) {
    const value = typeof token === 'string' ? token : token.access_token;
    localStorage.setItem(StorageKeys.TOKEN, value);
  }

  remove() {
    localStorage.removeItem(StorageKeys.TOKEN);
  }

  get(): string {
    return localStorage.getItem(StorageKeys.TOKEN) ?? '';
  }

  private decode(): any {
    const token = this.get();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  getSubject(): string {
    return this.decode()?.sub ?? '';
  }

  getEnterprise(): string {
    return this.decode()?.empresa ?? '';
  }

  getContract(): string {
    return this.decode()?.contrato ?? '';
  }

  getUserRoles(): string[] {
    return this.decode()?.roles ?? [];
  }

  isTokenValid(): boolean {
    const decoded = this.decode();
    if (!decoded?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  hasStock(): boolean {
    return this.hasRole('ROLE_EST');
  }

  hasService(): boolean {
    return this.hasRole('ROLE_SER');
  }

  hasFinance(): boolean {
    return this.hasRole('ROLE_FIN');
  }
}
