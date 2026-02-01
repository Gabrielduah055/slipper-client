import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
  action?: {
    label: string;
    route?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' = 'success', action?: { label: string, route?: string }) {
    this.toastSubject.next({ text, type, action });
    setTimeout(() => {
      this.clear();
    }, 4000); // Auto dismiss after 4 seconds
  }

  clear() {
    this.toastSubject.next(null);
  }
}
