import { apiProduct } from "./api";


export type Menu = {
    id: number;
    name: string;
    description: string;
    price: number;
}


export const getMenu = async () => {
  const res = await apiProduct.get("/menu");  
  return res.data;                          
};