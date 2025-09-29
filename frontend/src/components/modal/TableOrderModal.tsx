import { useEffect, useState } from "react";
import type { TableStatus } from "../../data/Tables";
import MenuList from "../order/MenuList";
import CurrentOrder from "../order/CurrentOrder";
import { getTableDetail } from "../../hooks/Table";
import { useParams } from "react-router-dom";

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
};

type TableOrderModalProps = {
  tableId: number;
  table_number: number;
  initialStatus: TableStatus;
  onClose: () => void;
};

export default function TableOrderModal({
  tableId,
  table_number,
  initialStatus,
  onClose,
}: TableOrderModalProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableStatus, setTableStatus] = useState<TableStatus>(initialStatus);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTableDetail = async () => {
      try {
        setLoading(true);
        const res = await getTableDetail(tableId);
        if (res.data?.data?.data) {

          const items = res.data.data.data.map((menu) => ({
            name: menu.name,
            qty: menu.qty,
            price: Number(menu.price),
          }));
          setOrderItems(items);
        }

        if (res.data?.data?.data[0]?.status) {
          setTableStatus(res.data.data.data[0].status as TableStatus);
        } else {
          setTableStatus(initialStatus);
        }
      } catch (err) {
        console.error("Failed to fetch table detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTableDetail();
  }, [tableId, initialStatus]);

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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
        <div className="bg-white rounded-lg shadow-lg p-6">Loading...</div>
      </div>
    );
  }

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
          Table {id} (Status: {tableStatus})
        </h2>

        <div className="flex gap-6">
          {/* LEFT: Menu List */}
          {/* <MenuList
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            tableStatus={tableStatus}
            setTableStatus={setTableStatus}
          /> */}

          {/* RIGHT: Current Order */}
          <CurrentOrder
            tableId={tableId}
            tableNumber={table_number}
            tableStatus={tableStatus}
            orderItems={orderItems}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onCloseTableOrderModal={onClose}
            onUpdateTableStatus={(id, status) => {
              setTableStatus(status);
            }}
          />
        </div>
      </div>
    </div>
  );
}
