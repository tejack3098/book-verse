import { IOrderItem } from "./IOrderItem";

// Interface for IOrder
export interface IOrder {
    id: string;
    orderId: string;
    userId: string;
    tax?: number;
    total: number;
    shipping?: number; 
    items: IOrderItem[];
    deliveryDate?: string; // Optional
  }
  