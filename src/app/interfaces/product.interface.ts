export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  available: boolean;
  description: string;
  specs: string[];
  image: string;
  brand: string;
}