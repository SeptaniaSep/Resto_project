import type { TableStatus } from "../../data/Tables";
import { postOrder } from "../../hooks/Order";
import type { OrderItem } from "./TableOrderModal";
import { useState } from "react";

type InvoiceModalProps = {
  tableId: number;
  tableNumber: number;
  tableStatus: TableStatus;
  orderItems: OrderItem[];
  total: number;
  onClose: () => void;
  onCloseTableOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  showCookButton?: boolean;
};

export default function InvoiceModal({
  tableId,
  tableNumber,
  tableStatus,
  orderItems,
  onClose,
  onCloseTableOrderModal,
  showCookButton = true, 
}: InvoiceModalProps) {
  const [loading, setLoading] = useState(false);
  const totalMenus = orderItems.reduce((acc, item) => acc + item.qty, 0);

  const handleProcess = async () => {
    if (orderItems.length === 0) {
      alert("Belum ada menu yang dipesan!");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        table_number: tableNumber,
        status: tableStatus,
        orders: orderItems,
      };

      const res = await postOrder(payload);

      alert("Pesanan berhasil dikirim ke dapur!");
      onClose();
      onCloseTableOrderModal(false);
    } catch (err: any) {
      console.error("Gagal submit order:", err.response?.data || err);
      alert("Gagal submit order, cek console untuk detail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Invoice</h2>
        <p className="text-sm text-gray-600 mb-2">
          Table <span className="font-semibold">{tableNumber}</span> • Status:{" "}
          <span className="font-medium">{tableStatus}</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Date: {new Date().toLocaleDateString("id-ID")}{" "}
          {new Date().toLocaleTimeString("id-ID")}
        </p>

        {/* Order list */}
        <div>
          {orderItems.map((item) => (
            <div key={item.name} className="flex justify-between py-2 text-l">
              <span>{item.name}</span>
              <span>{item.qty}</span>
            </div>
          ))}
        </div>

        {/* Total menu */}
        <div className="flex justify-between font-semibold text-lg border-t mt-4 pt-2">
          <p>Total Menu:</p>
          <p>{totalMenus} pcs</p>
        </div>

        {/* Action */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bgbutton-1 text-white rounded-lg"
            onClick={handleProcess}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Pesanan Diproses Dapur"}
          </button>
        </div>
      </div>
    </div>
  );
}
