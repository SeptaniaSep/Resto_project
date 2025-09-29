import type { TableStatus } from "../../data/Tables";
import { getStatusStyle } from "../utils/TableStatus";

type Table = {
  id: number;
  table_number: number;
  status: TableStatus;
};

export default function CustomerTableCard({ table }: { table: Table }) {
  return (
    <div
      className={`rounded-lg p-4 h-30 shadow-md flex flex-col gap-2 items-center justify-center ${getStatusStyle(
        table.status
      )}`}
    >
      <h3 className="text-5xl font-bold">{table.table_number}</h3>
      <p className="text-sm font-medium capitalize">{table.status}</p>
    </div>
  );
}
