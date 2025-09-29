import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TableStatus } from "../../data/Tables";
import TableOrderModal from "../modal/TableOrderModal";
import StatusDropdown from "../order/StatusDropDown";
import { getStatusStyle } from "../utils/TableStatus";

type Table = {
  id: number;
  table_number: number;
  status: TableStatus;
};

export default function TableCard({
  table,
  onStatusChange,
}: {
  table: Table;
  onStatusChange: (id: number, status: TableStatus) => void;
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (table.status === "available") {
      navigate(`/order/${table.table_number}`);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={`rounded-lg p-4 h-30 shadow-md flex flex-col gap-2 items-center justify-center cursor-pointer ${getStatusStyle(
          table.status
        )}`}
      >
        <h3 onClick={handleClick} className="text-3xl font-semibold">
          {table.table_number}
        </h3>

        {/* dropdown status */}
        <StatusDropdown
          value={table.status}
          onChange={(status) => onStatusChange(table.id, status)}
        />
      </div>

      {isModalOpen && (
        <TableOrderModal
          tableId={table.table_number}
          tableName={table.table_number}
          initialStatus={table.status}
          onClose={() => setIsModalOpen(false )}
        />
      )}
    </>
  );
}
