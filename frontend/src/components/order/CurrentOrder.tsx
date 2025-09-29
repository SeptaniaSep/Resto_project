import { useEffect, useState } from "react";
import type { TableStatus } from "../../data/Tables";
import type { OrderItem } from "../modal/TableOrderModal";
import InvoiceModal from "../modal/InvoiceModalItems";
import { postOrder } from "../../hooks/Order";
import { GiCampCookingPot } from "react-icons/gi";
import InvoiceModalPayments from "../modal/InvoiceModalPayments";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

type CurrentOrderProps = {
  tableId: number;
  tableNumber: number; 
  tableStatus: TableStatus;
  orderItems: OrderItem[];
  onAddItem: (item: OrderItem) => void;
  onRemoveItem: (item: OrderItem) => void;
  onUpdateTableStatus: (id: number, status: TableStatus) => void;
  onCloseTableOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CurrentOrder({
  tableId,
  tableNumber,
  tableStatus,
  orderItems,
  onAddItem,
  onRemoveItem,
  onUpdateTableStatus,
  onCloseTableOrderModal,
}: CurrentOrderProps) {
  const [showInvoice, setShowInvoice] = useState(false);
  const [showInvoicePay, setShowInvoicePay] = useState(false);
  const [storedOrders, setStoredOrders] = useState<OrderItem[]>([]);


  useEffect(() => {
    const item = localStorage.getItem(`orderItems-${tableId}`);
    if (item) setStoredOrders(JSON.parse(item));
  }, [tableId]);

  
  useEffect(() => {
    localStorage.setItem(`orderItems-${tableId}`, JSON.stringify(orderItems));
    setStoredOrders(orderItems);
  }, [orderItems, tableId]);

  const onClickPost = async () => {
    if (storedOrders.length === 0) {
      alert("Belum ada order!");
      return;
    }

    const data = {
      table_number: tableNumber, 
      status: tableStatus,
      orders: storedOrders.map((i) => ({
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
    };

    try {
      await postOrder(data);
      
      setShowInvoice(true);
    } catch (err) {
      console.error(err);
    }
  };

  const total = orderItems.reduce(
    (acc, item) => acc + item.qty * Number(item.price),
    0
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const handleCloseInvoice = () => {
    setShowInvoice(false);
    setStoredOrders([]);
    localStorage.removeItem(`orderItems-${tableId}`);
  };

  const handleCloseInvoicePay = () => {
    setShowInvoicePay(false);
    setStoredOrders([]);
    localStorage.removeItem(`orderItems-${tableId}`);
  };

  return (
    <div className="w-100   bg-gray-50 rounded-lg p-4 shadow">
      <div className="mb-4">
        <p className="font-semibold">Current Order</p>
        <p className="text-xs text-gray-600">
          Table {tableNumber} • {new Date().toLocaleDateString("id-ID")}
        </p>
        <p className="text-xs mt-1">
          Status: <span className="font-medium">{tableStatus}</span>
        </p>
      </div>

      <div className="space-y-3">
        {orderItems.length === 0 ? (
          <p className="text-sm text-gray-400">No items yet</p>
        ) : (
          orderItems.map((item) => (
            <div key={item.name} className="pb-2">
              <div className="flex justify-between">
                <p className="font-medium">{item.name}</p>
                <p>{formatCurrency(item.qty * Number(item.price))}.00</p>
              </div>
              <div className="flex gap-2 items-center mt-2">
                <button
                  onClick={() => onAddItem(item)}
                  className="w-7 h-7 flex items-center justify-center bgbutton-1 text-white rounded text-sm"
                >
                  +
                </button>
                <p className="text-sm text-gray-500">x {item.qty}</p>
                <button
                  onClick={() => onRemoveItem(item)}
                  className="w-7 h-7 flex items-center justify-center bgbutton-1 text-white rounded text-sm"
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between font-semibold">
          <p>Total:</p>
          <p>{formatCurrency(total)}.00</p>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <button
          className="flex-1 mt-3 py-2 flex items-center justify-center bgbutton-1 cursor-pointer text-white rounded"
          onClick={onClickPost}
        >
          <GiCampCookingPot size={40} />
        </button>

        <button
          className="flex-1 mt-3 py-2 flex items-center justify-center bgbutton-3 cursor-pointer text-white rounded"
          onClick={() => setShowInvoicePay(true)}
        >
          <LiaMoneyBillWaveSolid size={40}/>
        </button>
      </div>

      {showInvoice && (
        <InvoiceModal
          tableId={tableId}
          tableNumber={tableNumber}   
          tableStatus={tableStatus}
          orderItems={storedOrders}
          total={total}
          onClose={handleCloseInvoice}
          onCloseTableOrderModal={onCloseTableOrderModal}
        />
      )}

      {showInvoicePay && (
        <InvoiceModalPayments
          tableId={tableId}
          tableNumber={tableNumber}  
          tableStatus={tableStatus}
          orderItems={storedOrders}
          total={total}
          onClose={handleCloseInvoicePay}
          onProcessOrder={(id) => {
            const tables = JSON.parse(localStorage.getItem("tables") || "[]");
            const updated = tables.map((t: any) =>
              t.id === id ? { ...t, status: "inactive" } : t
            );
            localStorage.setItem("tables", JSON.stringify(updated));
            onUpdateTableStatus(id, "inactive");
          }}
        />
      )}
    </div>
  );
}
