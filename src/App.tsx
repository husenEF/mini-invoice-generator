import { useState } from "react";
import { Printer, FileText } from "lucide-react";
import { InvoiceForm } from "./components/InvoiceForm";
import { InvoicePreview } from "./components/InvoicePreview";
import { InvoiceData } from "./types";

const initialData: InvoiceData = {
  companyName: "",
  companyAddress: "",
  invoiceNo: "",
  date: new Date().toISOString().split('T')[0],
  billTo: "",
  items: [
    {
      id: "1",
      description: "",
      quantity: 1,
      unitPrice: 0,
    },
  ],
  notes: "",
  footerMessage1: "",
  footerMessage2: "",
  themeColor: "#0056b3",
};

export default function App() {
  const [data, setData] = useState<InvoiceData>(initialData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900 print:bg-white print:min-h-0">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <div className="bg-[#0056b3] p-2 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">Invoice Generator</h1>
        </div>
        <button
          onClick={handlePrint}
          className="bg-[#0056b3] hover:bg-[#004494] text-white px-5 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print / Save PDF
        </button>
      </header>

      <main className="flex-1 p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-start print:block print:p-0 print:m-0">
        {/* Left: Editor */}
        <div className="xl:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-y-auto max-h-[calc(100vh-7rem)] sticky top-[5.5rem] print:hidden">
          <InvoiceForm data={data} onChange={setData} />
        </div>

        {/* Right: Live Preview */}
        <div className="xl:col-span-7 bg-gray-200/50 rounded-xl border border-gray-200 p-4 lg:p-10 overflow-x-auto relative min-h-[calc(100vh-7rem)] print:block print:bg-white print:p-0 print:border-none print:shadow-none print:m-0 print:min-h-0 flex items-start justify-center">
          <div className="shadow-2xl w-full max-w-[800px] bg-white print:shadow-none print:w-full print:mx-auto">
            <InvoicePreview data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
