import { useEffect, useState } from "react";
import type { TableStatus } from "../../data/Tables";
import { getTables } from "../../hooks/Table";
import CustomerTableCard from "../../components/costumer/TableCostumer";

type Table = {
  id: number;
  table_number: number;
  status: TableStatus;
};

export default function CustomerPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await getTables();
        setTables(res.data.data.table_list);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="m-6 min-h-screen">
      <div className="bg-4 p-4 pt-2 mt-4 rounded-lg shadow-md">
        <h1 className="text-2xl text-amber-50 font-bold py-2 pl-2">
          Please choose your table
        </h1>

        <div className="rounded-md bg-1 p-3 shadow-sm">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-300 rounded-sm"></span>
              <span className="text-sm text-gray-50">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-700 rounded-sm"></span>
              <span className="text-sm text-gray-50">Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-400 rounded-sm"></span>
              <span className="text-sm text-gray-50">Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-400 rounded-sm"></span>
              <span className="text-sm text-gray-50">Inactive</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-3 p-4 pt-2 mt-4 rounded-lg shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6 px-6 pb-6">
          {tables.map((table) => (
            <CustomerTableCard key={table.id} table={table} />
          ))}
        </div>
      </div>
    </div>
  );
}
