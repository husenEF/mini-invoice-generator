import { InvoiceData } from "../types";

interface Props {
  data: InvoiceData;
}

export const formatIDR = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, ""); // Remove spaces to match the screenshot 'Rp22.000' formatting accurately
};

export function InvoicePreview({ data }: Props) {
  const subtotal = data.items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  );

  return (
    <div
      className="bg-white p-6 sm:p-12 max-w-[800px] w-full text-[#111827] mx-auto min-h-[auto] sm:min-h-[1050px] flex flex-col font-sans print:p-0 print:w-full print:max-w-none print:min-h-0"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-6 sm:gap-0 print:flex-row print:gap-0">
        <div>
          <h1
            className="text-4xl font-bold uppercase tracking-wide mb-2"
            style={{ color: data.themeColor || "#0056b3" }}
          >
            {data.companyName}
          </h1>
          <p className="text-[#4b5563] whitespace-pre-line text-sm">
            {data.companyAddress}
          </p>
        </div>
        <div className="text-left sm:text-right print:text-right">
          <h2 className="text-3xl font-bold text-[#1f2937] mb-4">INVOICE</h2>
          <div className="text-sm text-[#374151] space-y-1">
            <p>
              <span className="font-semibold">No:</span> {data.invoiceNo}
            </p>
            <p>
              <span className="font-semibold">Tanggal:</span> {data.date}
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-full h-[2px] mb-8"
        style={{ backgroundColor: data.themeColor || "#0056b3" }}
      />

      {/* Bill To */}
      <div className="mb-8">
        <h3
          className="font-bold text-sm mb-2 uppercase"
          style={{ color: data.themeColor || "#0056b3" }}
        >
          KEPADA:
        </h3>
        <p className="text-[#1f2937] text-sm whitespace-pre-line">
          {data.billTo || "-"}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-8 print:overflow-visible">
        <table className="w-full text-sm text-left min-w-[500px] print:min-w-full">
          <thead>
            <tr className="bg-[#f9fafb] border-y border-[#e5e7eb]">
            <th className="py-3 px-4 font-semibold text-[#374151] w-1/2">
              Deskripsi Produk
            </th>
            <th className="py-3 px-4 font-semibold text-[#374151] text-center">
              Jumlah
            </th>
            <th className="py-3 px-4 font-semibold text-[#374151] text-right">
              Harga Satuan
            </th>
            <th className="py-3 px-4 font-semibold text-[#374151] text-right">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr
              key={item.id}
              className="border-b border-[#f3f4f6]"
            >
              <td className="py-3 px-4 text-[#1f2937]">{item.description}</td>
              <td className="py-3 px-4 text-[#1f2937] text-center">
                {item.quantity}
              </td>
              <td className="py-3 px-4 text-[#1f2937] text-right">
                {formatIDR(item.unitPrice)}
              </td>
              <td className="py-3 px-4 text-[#1f2937] text-right">
                {formatIDR(item.quantity * item.unitPrice)}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex flex-col sm:flex-row justify-between mb-16 gap-8 sm:gap-0 print:flex-row print:gap-0">
        <div className="w-full sm:w-1/2 sm:pr-8 print:w-1/2 print:pr-8">
          {data.notes && (
            <div className="text-sm text-[#374151] whitespace-pre-line mt-2">
              <span className="font-semibold block mb-1">Catatan:</span>
              {data.notes}
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/2 print:w-1/2">
          <div className="flex justify-between py-2 px-4 text-[#1f2937]">
            <span className="font-medium text-base">Subtotal</span>
            <span>{formatIDR(subtotal)}</span>
          </div>
          <div
            className="flex justify-between py-3 px-4 mt-2"
            style={{ backgroundColor: `${data.themeColor || "#0056b3"}1A` }}
          >
            <span
              className="font-bold text-lg"
              style={{ color: data.themeColor || "#0056b3" }}
            >
              TOTAL
            </span>
            <span
              className="font-bold text-lg"
              style={{ color: data.themeColor || "#0056b3" }}
            >
              {formatIDR(subtotal)}
            </span>
          </div>
        </div>
      </div>

      {/* Spacer to push footer down */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="mt-8 text-center space-y-2 border-t border-[#f3f4f6] pt-8">
        <p className="text-[#1f2937] italic text-sm">{data.footerMessage1}</p>
        <p className="text-[#6b7280] text-sm">{data.footerMessage2}</p>
      </div>
    </div>
  );
}
