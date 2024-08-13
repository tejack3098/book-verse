// src/utils/generateOrderId.ts

export const generateOrderId = (): string => {
    // Implement your logic to generate a unique order ID
    return 'ORDER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };
  