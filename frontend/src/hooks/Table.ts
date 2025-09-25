import { apiProduct } from "../api/api";

export type Table = {
  id: number;
  table_number: number;
  status: "available" | "occupied" | "reserved" | "inactive";
};


export type QuickStart = {
  available: string;
  occupied: string;
  reserved: string;
  inactive: string;
};

export type Data = {
  data: {
    table_list: Table[];
    quick_stats: QuickStart;
  };
};

export type Menu = {
  id: number;
  id_order: string;
  name: string;
  qty: number;
  price: string; 
  table_number: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type DataById = {
  data: {
    data: Menu[];
  };
};


export const getTables = async () => {
  return await apiProduct.get<Data>("/tablelist");
};

export const getTableByIdTble = async () => {
  return await apiProduct.get<DataById>("/tablelist/:id")
};