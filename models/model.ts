export interface PostList {
  data: {
    id: number;
    title: string;
    image: string[];
    address: string;
    price: number;
    area: number;
    likedBy: {
      user: {
        id: number
      }
    }[]
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
  user: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string | null;
    avatar: string | null;
  };
  comments: {
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      email: string;
      phoneNumber: string | null;
      avatar: string | null;
      role: string;
    };
  }[];
}



export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  role: string;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
