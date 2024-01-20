export interface PostList {
  data: {
    id: number;
    title: string;
    image: string[];
    address: string;
    price: number;
    area: number;
  }[];
}

export interface RoomDetails {
  id: number;
  title: string;
  address: string;
  image: string[]; 
  description: string;
  name: string;
  price: number;
  area: number;
  capacity: number;
  electricityPrice: number;
  waterPrice: number;
  wifiPrice: number;
  serviceCharge: number | null;
  laundryFee: number | null; 
  utilities: string; 
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
