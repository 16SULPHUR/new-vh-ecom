export interface ColorOption {
  name: string;
  hex_code: string;
}
// lib/types/product.ts
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  colorOptions: ColorOption[];
  sizes: string[];
  shipping_duration: number;
  tag: string;
};


export interface DbProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  shipping_duration: number;
  tag: string;
}

export interface DbVariation {
  id: number;
  product_id: number;
  color: string;
  size: string;
}

export interface DbImage {
  id: number;
  product_id: number;
  url: string;
  is_primary: boolean;
}

export interface DbCategory {
  id: number;
  name: string;
}

export interface CollectionProduct {
  product: DbProduct & {
    variations: DbVariation[];
    images: DbImage[];
    category: DbCategory;
  };
}