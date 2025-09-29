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

export type TableDetailResponse = {
  status: number;
  message: string;
  data: {
    data: Menu[];
    total: number;
  };
  time_stamp: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}

export const getTables = async () => {
  return await apiProduct.get<Data>("/tablelist");
};

export const getTableByIdTable = async () => {
  return await apiProduct.get<DataById>("/tablelist/:id")
};

export const getTableDetail = async (id: number) => {
  return await apiProduct.get<TableDetailResponse>(`/tablelist/${id}`);
};