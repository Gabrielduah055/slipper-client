declare module 'angular-paystack' {
  import { ModuleWithProviders } from '@angular/core';
  import * as i0 from "@angular/core";

  export class AngularPaystackComponent {
    static ɵcmp: i0.ɵɵComponentDeclaration<AngularPaystackComponent, "angular-paystack", never, { "paystackOptions": "paystackOptions"; "text": "text"; "key": "key"; "email": "email"; "amount": "amount"; "metadata": "metadata"; "ref": "ref"; "currency": "currency"; "channels": "channels"; "class": "class"; "style": "style"; }, { "paymentInit": "paymentInit"; "onClose": "onClose"; "callback": "callback"; }, never, never>;
  }

  export class AngularPaystackModule {
    static forRoot(publicKey: string): ModuleWithProviders<AngularPaystackModule>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AngularPaystackModule, [typeof AngularPaystackComponent], never, [typeof AngularPaystackComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AngularPaystackModule>;
  }

  export interface PaystackOptions {
    amount: number;
    transaction_charge?: number;
    email: string;
    currency?: string;
    ref?: string;
    metadata?: any;
    channels?: string[];
    subaccount?: string;
    label?: string;
    bearer?: string;
    [key: string]: any;
  }
}
