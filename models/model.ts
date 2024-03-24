export interface Room {
    id: number;
    title: number;
    capacity: number;
    area: number;
    price: number;
    electricity: number;
    water: number;
    wifi: number;
    deadline: number;
    floor: number;
    available: boolean;
    users: [];
}[];

export interface RoomDetails {
  id: number;
  title: number
  capacity: string;
  area: number;
  price: number;
  electricity: number;
  water: number;
  wifi: number;
  deadline: string;
  floor: number;
  available: boolean;
  users: {
    name: string;
    email: string;
    id: number;
  }[];
  issues: {
    id: number;
    content:string
  }[];
  contracts: {
    id: number;
    startDate: string;
    endDate: string;
  };
  // user: {
  //   id: number;
  //   name: string;
  //   email: string;
  //   phoneNumber: string | null;
  //   avatar: string | null;
  // };
  // comments: {
  //   id: number;
  //   content: string;
  //   createdAt: string;
  //   user: {
  //     id: number;
  //     name: string;
  //     email: string;
  //     phoneNumber: string | null;
  //     avatar: string | null;
  //     role: string;
  //   };
  // }[];
}

export interface UserProfile {
  id: number
  name: string;
  email: string;
  phoneNumber: number;
  gender: string;
  DoB: string;
  year_start: number;
  year_graduated: number;
  Student_ID: string;
  room: {
    id: number,
    title: number,
    deadline: number,
  }
  // id: number;
  // name: string;
  // email: string;
  // phoneNumber: string;
  // avatar: string | null;
  // role: string;
  // isLocked: boolean;
  // createdAt: string;
  // updatedAt: string;
  // deletedAt: string | null;
}
