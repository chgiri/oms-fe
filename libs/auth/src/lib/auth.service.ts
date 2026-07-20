// libs/auth/src/lib/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import type { LoginRequest, AuthResponse } from '@oms-fe/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // TODO (Phase 7): this should come from environment config, not be hardcoded —
  // per-domain base URLs are what let auth move to its own service later without
  // a grep-and-replace across the codebase.
  private readonly baseUrl = '/api/v1/auth';

  // Private, mutable signal — only this service can change auth state.
  private readonly _currentUser = signal<AuthResponse | null>(null);

  // Public, read-only view — components can react to it, but can't call .set() on it.
  readonly currentUser = this._currentUser.asReadonly();

  // Derived state — recomputes automatically whenever _currentUser changes.
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly role = computed(() => this._currentUser()?.role ?? null);

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => this._currentUser.set(response))
    );
  }

  logout(): void {
    this._currentUser.set(null);
    // TODO: call the backend to blacklist the token (your SecurityConfig has a
    // TokenBlacklistService — the frontend should hit an endpoint for it on logout).
  }

  get accessToken(): string | null {
    return this._currentUser()?.accessToken ?? null;
  }
}