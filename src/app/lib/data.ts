import { Product } from '@/app/models/product';
import productsData from '@/app/data/products.json';

export async function getProducts(): Promise<Product[]> {
  return productsData;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return productsData.find(p => p.id === id);
}
