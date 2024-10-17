import { defineStore } from 'pinia';
import type { ComputableItems } from '@/interfaces/ComputableItems';
import defaultInvoiceData from '@/data/defaultInvoiceData.json';

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
  items: InvoiceItems
}

export const useInvoiceStore = defineStore({
  id: 'form',
  state: (): { invoiceData: InvoiceFormData } => ({
    invoiceData: defaultInvoiceData as InvoiceFormData 
  }),
  actions: {
    updateInvoiceData(data: Partial<InvoiceFormData>) {
      this.invoiceData = { ...this.invoiceData, ...data };
    },
  },
});