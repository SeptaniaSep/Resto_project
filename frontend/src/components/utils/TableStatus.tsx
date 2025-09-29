import type { TableStatus } from "../../data/Tables";


export function getStatusStyle(status: TableStatus) {
  switch (status) {
    case "available":
      return "bg-gray-300 text-gray-800"; // meja kosong
    case "occupied":
      return "bg-gray-700 text-white"; // sedang dipakai
    case "reserved":
      return "bg-blue-400 text-white"; // sudah dibooking
    case "inactive":
      return "bg-gray-400 text-white"; // nonaktif
    default:
      return "bg-gray-200 text-gray-800"; // fallback
  }
}
