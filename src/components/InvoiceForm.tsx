import { Plus, Trash2 } from "lucide-react";
import { InvoiceData, InvoiceItem } from "../types";

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export function InvoiceForm({ data, onChange }: Props) {
  const updateField = (field: keyof InvoiceData, value: string | InvoiceItem[]) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substring(2, 9),
      description: "",
      quantity: 1,
      unitPrice: 0,
      discount: 0,
    };
    updateField("items", [...data.items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const newItems = data.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateField("items", newItems);
  };

  const removeItem = (id: string) => {
    updateField("items", data.items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Company Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Company Details</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="e.g. DEPOT AIR AL FATIH"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
            <textarea
              value={data.companyAddress}
              onChange={(e) => updateField("companyAddress", e.target.value)}
              rows={2}
              placeholder="e.g. Ngaglik, Sleman, DIY&#10;Indonesia"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Invoice Details */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Invoice Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice No.</label>
            <input
              type="text"
              value={data.invoiceNo}
              onChange={(e) => updateField("invoiceNo", e.target.value)}
              placeholder="e.g. INV/2026/001"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bill To</label>
            <textarea
              value={data.billTo}
              onChange={(e) => updateField("billTo", e.target.value)}
              rows={2}
              placeholder="Customer Name/Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={data.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={3}
              placeholder="Additional notes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Items</h2>
          <button
            onClick={addItem}
            className="text-sm flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="flex gap-3 items-start bg-gray-50 p-3 flex-wrap sm:flex-nowrap rounded-lg border border-gray-200">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-gray-500 mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Item description..."
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-20">
                <label className="block text-xs text-gray-500 mb-1">Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs text-gray-500 mb-1">Unit Price</label>
                <input
                  type="number"
                  min="0"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, "unitPrice", parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-24">
                <label className="block text-xs text-gray-500 mb-1">Disc / Item</label>
                <input
                  type="number"
                  min="0"
                  value={item.discount || 0}
                  onChange={(e) => updateItem(item.id, "discount", parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="pt-5">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Customization</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={data.themeColor}
                onChange={(e) => updateField("themeColor", e.target.value)}
                className="h-10 w-14 p-1 bg-white border border-gray-300 rounded-md cursor-pointer"
              />
              <span className="text-sm text-gray-500 uppercase font-mono">{data.themeColor}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold border-b pb-2">Footer Messages</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message 1</label>
            <input
              type="text"
              value={data.footerMessage1}
              onChange={(e) => updateField("footerMessage1", e.target.value)}
              placeholder="e.g. Terima kasih sudah berbelanja"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message 2</label>
            <input
              type="text"
              value={data.footerMessage2}
              onChange={(e) => updateField("footerMessage2", e.target.value)}
              placeholder="e.g. Kesegaran air murni untuk keluarga Anda."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
