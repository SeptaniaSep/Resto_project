import { useNavigate } from "react-router-dom";
import type { TableStatus } from "../../data/Tables";
import type { OrderItem } from "./TableOrderModal";
import { GiPayMoney } from "react-icons/gi";

type InvoiceModalProps = {
  tableId: number;
  tableName: number;
  tableStatus: TableStatus;
  orderItems: OrderItem[];
  total: number;
  onClose: () => void;
  onProcessOrder: (tableId: number) => void;
};

export default function InvoiceModalPayments({
  tableId,
  tableName,
  tableStatus,
  orderItems,
  onClose,
  onProcessOrder,
}: InvoiceModalProps) {
  const totalMenus = orderItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPaymen = orderItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const navigate = useNavigate();

  const handleProcess = () => {
    onProcessOrder(tableId);
    onClose();
    navigate("/");
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

        <h2 className="text-xl font-bold mb-4">Payment</h2>
        <p className="text-sm text-gray-600 mb-2">
          Table <span className="font-semibold">{tableName}</span> • Status:{" "}
          <span className="font-medium">{tableStatus}</span>
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Date: {new Date().toLocaleDateString("id-ID")}{" "}
          {new Date().toLocaleTimeString("id-ID")}
        </p>

        {/* Order list */}
        <div>
          {orderItems.map((item) => (
            <div key={item.name} className="flex justify-between pt-2">
              <span>{item.name}</span>
              <div className="flex gap-10">
                <span> x {item.qty}</span>
                <span>Rp {item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total menu */}
        <div className="flex justify-between font-semibold text-lg border-t mt-4 pt-2">
          <p>Total Menu:</p>
          <p>{totalMenus} pcs</p>
          <p>Rp {totalPaymen}.00</p>
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
          >
            <GiPayMoney size={40} />
          </button>
        </div>
      </div>
    </div>
  );
}
