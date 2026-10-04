export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CheckoutFormState {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  instructions: string;
  paymentMethod: 'cod' | 'wallet' | 'bank';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning';
}
