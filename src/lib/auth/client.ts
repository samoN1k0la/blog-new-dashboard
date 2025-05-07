'use client';

import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
  name: string
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const registerRes = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: params.name,
          email: params.email,
          password: params.password,
        }),
      });

      if (!registerRes.ok) {
        const errorData = await registerRes.json();
        return { error: errorData.message || 'Registration failed' };
      }

      const loginRes = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
        }),
      });

      if (!loginRes.ok) {
        const errorData = await loginRes.json();
        return { error: errorData.message || 'Auto-login after registration failed' };
      }

      const loginData = await loginRes.json();
      localStorage.setItem('custom-auth-token', loginData.accessToken);

      return {};
    } catch (err) {
      return { error: 'Network or server error during sign-up' };
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: params.email,
          password: params.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.message || 'Login failed' };
      }

      const data = await res.json();
      localStorage.setItem('custom-auth-token', data.accessToken);
      return {};
    } catch (err) {
      return { error: 'Network or server error during login' };
    }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    try {
      const res = await fetch('http://localhost:4000/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Token invalid or expired
          localStorage.removeItem('custom-auth-token');
          return { data: null };
        }

        const errorData = await res.json();
        return { error: errorData.message || 'Failed to fetch user' };
      }

      const userData: User = await res.json();
      return { data: userData };
    } catch (err) {
      return { error: 'Network error while fetching user' };
    }
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
