import { defineStore } from 'pinia';
import type { ComputableItems } from '@/interfaces/ComputableItems';

interface PayRateInfo {
  monthlyRate: Number,
  dailyRate: Number,
  fridayRates: Number,
  hourlyRate: Number
}

interface InvoiceItems {
  weekdays: ComputableItems,
  fridays: ComputableItems,
  otWeekdays: ComputableItems,
  otFridays: ComputableItems,
  otWeekends: ComputableItems,
}

interface InvoiceFormData {
  number: number;
  to: string;
  from: string;
  date: string;
  subject: string;
  headers: string;
  payRateInfo: PayRateInfo,
  items: {
    weekdays: ComputableItems,
    fridays: ComputableItems,
    otWeekdays: ComputableItems,
    otFridays: ComputableItems,
    otWeekends: ComputableItems,
  }
}

export const useInvoiceStore = defineStore({
  id: 'form',
  state: (): { invoiceData: InvoiceFormData } => ({
    invoiceData: {
      number: 0,
      to: '',
      from: '',
      date: '',
      subject: '',
      headers: '',
      payRateInfo: {
        monthlyRate: 0.00,
        dailyRate: 0.00,
        fridayRates: 0.00,
        hourlyRate: 0.00
      },
      items: {
        weekdays: {
          description: 'Weekdays 8 hours',
          quantity: 0,
          unitPrice: 0,
          total: 0
        },
        fridays: {
          description: 'Weekdays 4 hours (Friday)',
          quantity: 0,
          unitPrice: 0,
        },
        otFridays: {
          description: '<strong>Overtime</strong> Friday 4 hours',
          quantity: 0,
          unitPrice: 0,
        },
        otWeekdays:{
          description: '<strong>Overtime</strong> Weekdays 2 hours',
          quantity: 0,
          unitPrice: 0,
        },
        otWeekends: {
          description: '<strong>Overtime</strong> Weekends (8 hours)',
          quantity: 0,
          unitPrice: 0,
        },
      }
    },
  }),
  actions: {
    updateInvoiceData(data: Partial<InvoiceFormData>) {
      this.invoiceData = { ...this.invoiceData, ...data };
    },
    submitInvoiceData() {
      console.log('Form Submitted:', this.invoiceData);
      // Add your form submission logic here
    },
  },
});
