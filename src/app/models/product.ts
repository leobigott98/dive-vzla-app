export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // in cents
  image: string;
  currency: string; // 'usd' or 'ves'
  category: string;
};
