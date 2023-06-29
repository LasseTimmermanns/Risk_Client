import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  setCookie(name: string, value: string, days: number): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + ((days) ? '; expires=' + expirationDate.toUTCString() : '');
    document.cookie = name + '=' + cookieValue + '; path=/';
  }

  getCookie(name: string): string {
    const cookieName = name + '=';
    const cookieArray = document.cookie.split(';');
    for (const cookie of cookieArray) {
      let currentCookie = cookie;
      while (currentCookie.charAt(0) === ' ') {
        currentCookie = currentCookie.substring(1);
      }
      if (currentCookie.indexOf(cookieName) === 0) {
        return decodeURIComponent(currentCookie.substring(cookieName.length));
      }
    }
    return '';
  }

  deleteCookie(name: string): void {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
