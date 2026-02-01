import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  toastService = inject(ToastService);
  toast$ = this.toastService.toast$;
}
