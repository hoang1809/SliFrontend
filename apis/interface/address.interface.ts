
export interface IAddressInfo {
  id: number;
  name: string;
  phone: string;
  streetAddress: string;
  city?: string;
  district?: string;
}

export interface IAddress {
  id?: number;
  shopId?: number;
  name?: string;
  phone?: string;
  country?: string;
  city?: string;
  cityCode?: number;
  district?: string;
  districtCode?: number;
  ward?: string;
  wardCode?: number;
  zipCode?: string;
  streetAddress?: string;
  lat?: number;
  lng?: number;
  tag?: string;
  createdAt?: string;
  updatedAt?: string;
}
