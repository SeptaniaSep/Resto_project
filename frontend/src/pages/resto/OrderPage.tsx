import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import MenuList from "../../components/order/MenuList";
import CurrentOrder from "../../components/order/CurrentOrder";
import { IoMdArrowRoundBack } from "react-icons/io";
import type { TableStatus } from "../../data/Tables";

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

export default function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [tableStatus, setTableStatus] = useState<TableStatus>("available");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleAddItem = (item: { name: string; price: number }) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const onClose = () => {
    navigate("/");
  };

  const handleRemoveItem = (item: { name: string; price: number }) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (!existing) return prev;

      if (existing.qty === 1) {
        return prev.filter((i) => i.name !== item.name);
      }

      return prev.map((i) =>
        i.name === item.name ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/")}
          className="flex gap-2 p-1 rounded items-center hover:bg-gray-200 transition"
        >
          <IoMdArrowRoundBack size={20} />
        </button>
        <h1 className="flex gap-1 items-center">
          Table
          <h1 className="text-xl font-semibold">{id}</h1>
          (Status: {tableStatus})
        </h1>
      </div>

      <div className="flex gap-6">
        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-4">
          <MenuList
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            tableStatus={tableStatus}
            setTableStatus={setTableStatus}
          />
        </div>

        {/* RIGHT */}
        <CurrentOrder
          tableId={Number(id)}
          tableNumber={Number(id)}
          tableStatus={tableStatus}
          orderItems={orderItems}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onCloseTableOrderModal={onClose}
          onUpdateTableStatus={(id, status) => {
            setTableStatus(status);
            localStorage.setItem(`status_table_${id}`, status);

            const savedTables = JSON.parse(
              localStorage.getItem("tables") || "[]"
            );
            const updatedTables = savedTables.map((t: any) =>
              t.id === id ? { ...t, status } : t
            );
            localStorage.setItem("tables", JSON.stringify(updatedTables));
          }}
        />
      </div>
    </div>
  );
}
