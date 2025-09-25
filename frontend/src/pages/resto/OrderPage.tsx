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

export default function OrderPage(
) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // const [table, setTable] = useState<Table[] | null>([]);
  const [tableStatus, setTableStatus] = useState<TableStatus>("available");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // useEffect(() => {
  //   const fetchTable = async () => {
  //     try {
  //       const res = await getTables();
  //       console.log("res", res);

  //       setTable(res.data.data.table_list);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchTable();
  // }, []);

  // useEffect(() => {
  //   if (!id) return;
  //   const savedOrders = localStorage.getItem(`orders_table_${id}`);
  //   if (savedOrders) {
  //     setOrderItems(JSON.parse(savedOrders));
  //   }
  // }, [id]);

  // useEffect(() => {
  //   if (!id) return;
  //   localStorage.setItem(`orders_table_${id}`, JSON.stringify(orderItems));
  // }, [orderItems, id]);

  // useEffect(() => {
  //   if (!id) return;
  //   localStorage.setItem(`status_table_${id}`, tableStatus);
  // }, [tableStatus, id]);

  // if (!table) {
  //   return <div className="p-6">Loading table data...</div>;
  // }

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
          className="p-1 rounded hover:bg-gray-200 transition"
        >
          <IoMdArrowRoundBack size={20} />
        </button>

        <h2 className="text-lg font-semibold">
          {/* Table {tableName} (Status: {tableStatus}) */}
        </h2>
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
          tableName={Number(id)}
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
