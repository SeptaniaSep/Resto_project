import { useEffect, useState } from "react";
import QuickStatus from "../../components/dashboard/QuickStatus";
import TableCard from "../../components/dashboard/TableCard";
import TableStatus from "../../components/dashboard/TableStatus";
import { getTables, type Table } from "../../hooks/Table";
import type { TableStatus as Status } from "../../data/Tables";

export default function DashboardPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await getTables();
        setTables(res.data.data.table_list);
      } catch (err) {
        console.error("Failed to fetch tables:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const updateStatus = (id: number, newStatus: Status) => {
    setTables((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const quickStats = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    inactive: tables.filter((t) => t.status === "inactive").length,
  };

  if (loading) {
    return <p className="p-6">Loading tables...</p>;
  }

  return (
    <div className="m-6 px-6">
      <TableStatus />

      <div className="flex gap-4 mt-6">
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
            {tables.map((table) => (
              <TableCard
                key={table.id}
                table={table}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        </div>

        <QuickStatus
          available={quickStats.available}
          occupied={quickStats.occupied}
          reserved={quickStats.reserved}
          inactive={quickStats.inactive}
        />
      </div>
    </div>
  );
}
