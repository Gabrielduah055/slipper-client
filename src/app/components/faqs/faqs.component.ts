import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  faqs = [
    {
      question: "How long does delivery take?",
      answer: "For orders within Accra, we offer same-day or next-day delivery. For other regions in Ghana, delivery typically takes 2-3 business days via courier services.",
      isOpen: true
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Mobile Money (MTN, Vodafone, AirtelTigo), Card Payments (Visa/Mastercard), and Cash on Delivery (COD) for orders within Accra.",
      isOpen: false
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship worldwide via DHL. International shipping rates vary by location and weight. Please contact us on WhatsApp for a shipping quote.",
      isOpen: false
    },
    {
      question: "Can I return or exchange my order?",
      answer: "Yes, we accept returns and exchanges within 14 days of purchase, provided the items are unworn and in their original packaging. Please see our Return Policy page for more details.",
      isOpen: false
    },
    {
      question: "Where is your shop located?",
      answer: "Our workshop and showroom are located in Accra. While we primarily operate online, you can visit us by appointment to try on sizes.",
      isOpen: false
    },
    {
      question: "Do you offer custom designs?",
      answer: "Yes, we accept custom orders for specific colors or materials. Custom orders typically take 5-7 business days to complete.",
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
