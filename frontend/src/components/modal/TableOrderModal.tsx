import { useState, useEffect } from "react";
import type { TableStatus } from "../../data/Tables";
import MenuList from "../order/MenuList";
import CurrentOrder from "../order/CurrentOrder";

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type TableOrderModalProps = {
  tableId: number;
  tableName: number;
  initialStatus: TableStatus;
  onClose: () => void;
};

export default function TableOrderModal({
  tableId,
  tableName,
  initialStatus,
  onClose,
}: TableOrderModalProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    const savedOrders = localStorage.getItem(`orderItems-${tableId}`);
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [tableStatus, setTableStatus] = useState<TableStatus>(() => {
    const savedStatus = localStorage.getItem(`tableStatus-${tableId}`);
    return savedStatus ? (savedStatus as TableStatus) : initialStatus;
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem(`orderItems-${tableId}`);
    const savedStatus = localStorage.getItem(`tableStatus-${tableId}`);

    if (savedOrders) setOrderItems(JSON.parse(savedOrders));
    if (savedStatus) setTableStatus(savedStatus as TableStatus);
    else setTableStatus(initialStatus);
  }, [tableId, initialStatus]);

  useEffect(() => {
    localStorage.setItem(`orderItems-${tableId}`, JSON.stringify(orderItems));
  }, [orderItems, tableId]);

  useEffect(() => {
    localStorage.setItem(`tableStatus-${tableId}`, tableStatus);
  }, [tableStatus, tableId]);

  const handleAddItem = (item: { name: string; price: number }) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing)
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleRemoveItem = (item: { name: string; price: number }) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.name !== item.name);
      return prev.map((i) =>
        i.name === item.name ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
      <div className="bg-white rounded-lg shadow-lg w-auto max-w-7xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Table {tableName} (Status: {tableStatus})
        </h2>

        <div className="flex gap-6">
          {/* LEFT: Menu List */}
          <MenuList
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            tableStatus={tableStatus}
            setTableStatus={setTableStatus}
          />

          {/* RIGHT: Current Order */}
          <CurrentOrder
            tableId={tableId}
            tableName={tableName}
            tableStatus={tableStatus}
            orderItems={orderItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onCloseTableOrderModal={onClose}
            onUpdateTableStatus={(id, status) => {
              const tables = JSON.parse(localStorage.getItem("tables") || "[]");
              const updated = tables.map((t: any) =>
                t.id === id ? { ...t, status } : t
              );
              localStorage.setItem("tables", JSON.stringify(updated));

              setTableStatus(status);
              localStorage.setItem(`tableStatus-${id}`, status);
            }}
          />
        </div>
      </div>
    </div>
  );
}
