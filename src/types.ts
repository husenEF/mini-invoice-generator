export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export interface InvoiceData {
  companyName: string;
  companyAddress: string;
  invoiceNo: string;
  date: string;
  billTo: string;
  items: InvoiceItem[];
  notes: string;
  footerMessage1: string;
  footerMessage2: string;
  themeColor: string;
}
