
export enum AppView {
  CLIENT = 'CLIENT',
  SELLER = 'SELLER'
}

export enum ProjectStatus {
  NEGOTIATING = 'NEGOTIATING',
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERED = 'DELIVERED',
  REVISING = 'REVISING',
  COMPLETED = 'COMPLETED'
}

export interface Service {
  id: string;
  title: string;
  sellerName: string;
  sellerAvatar: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  preview3D?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'invoice' | 'system';
  invoiceData?: {
    amount: number;
    description: string;
    id: string;
  };
}

export interface Project {
  id: string;
  serviceId: string;
  clientId: string;
  sellerId: string;
  status: ProjectStatus;
  totalAmount: number;
  messages: Message[];
  revisionsLeft: number;
}
