
import { apiProduct } from "../api/api";
import type { OrderItem } from "../pages/resto/OrderPage";

export const postOrder = async ( data: {
    table_number: number,
    status: string,
    orders: OrderItem[]
    
}) => {
    return await apiProduct.post("/list-order", data)
      
}

export const EditStatusTable = async (
  id: number,
  status: "available" | "occupied" | "reserved" | "inactive"
) => {
  return await apiProduct.put(`/tablelist/${id}`, { status });
};
