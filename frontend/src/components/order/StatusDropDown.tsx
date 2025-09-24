import type { TableStatus } from "../../data/Tables";


type Props = {
  value: TableStatus;
  onChange: (status: TableStatus) => void;
};

export default function StatusDropdown({ value, onChange }: Props) {
  const statuses: TableStatus[] = [
    "available",
    "occupied",
    "reserved",
    "inactive",
  ];

  const getStatusStyle = (status: TableStatus) => {
    switch (status) {
      case "available":
        return "bg-gray-300 text-gray-800";
      case "occupied":
        return "bg-gray-700 text-white";
      case "reserved":
        return "bg-blue-400 text-white";
      case "inactive":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TableStatus)}
        className={`rounded-lg px-3 py-2 text-sm font-semibold shadow-sm cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${getStatusStyle(
          value
        )}`}
      >
        {statuses.map((status) => (
          <option key={status} value={status} className={getStatusStyle(status)}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
