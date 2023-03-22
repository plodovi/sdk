export interface Cart {
  items: CartItem[];
  itemIds: string[];
  region: string;
  id?: string;
  guestId?: string;
}

export interface CartItem {
  retailer: string;
  id: string;
  quantityType: string;
  volumeType: string;
  label: string;
  strain: string;
  category: string;
  subCategory: string;
  subStrain: string;
  quantity: number;
  price: any[];
  retailerListed: boolean;
  active: boolean;
  image?: string;
  pack?: number;
  packs?: any[];
  latestOrder: number;
  earliestOrder?: number;
  latestOrderDate?: number;
  maxQuantity?: number;
  minQuantity?: number;
  discount?: any;
  bottleRefund: boolean;
  thermalPackaging: boolean;
  warehouseCode: string;
}
