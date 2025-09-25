import type { OrderItem } from "../components/modal/TableOrderModal";
import { apiProduct } from "../api/api";

export const postOrder = async ( data: {
    table_number: number,
    status: string,
    orders: OrderItem[]
}) => {
    return await apiProduct.post("/list-order", data)
}
