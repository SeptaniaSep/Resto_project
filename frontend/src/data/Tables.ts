export type TableStatus = "available" | "occupied" | "reserved" | "inactive";

export type Table = {
  id: number;
  name: string;
  status: TableStatus;
};

// export const tables: Table[] = [
//   { id: 1, name: "1", status: "available" },
//   { id: 2, name: "2", status: "occupied" },
//   { id: 3, name: "3", status: "available" },
//   { id: 4, name: "4", status: "reserved" },
//   { id: 5, name: "5", status: "inactive" },
//   { id: 6, name: "6", status: "available" },
//   { id: 7, name: "7", status: "occupied" },
//   { id: 8, name: "8", status: "reserved" },
//   { id: 9, name: "9", status: "occupied" },
//   { id: 10, name: "10", status: "available" },
// ];
