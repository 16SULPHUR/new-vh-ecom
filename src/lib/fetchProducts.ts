import { supabase } from "./supabase";
import type { Product } from "@/lib/types/product";

export interface DatabaseProduct {
  id: number;
  name: string;
  description: string | null;
  price: number;
  shipping_duration: number;
  tag: string | null;
  images: Array<{
    url: string;
    is_primary: boolean;
  }>;
  variations: Array<{
    color: string;
    size: string;
  }>;
  category: {
    id: number;
    name: string;
  };
}

export function toTitleCase(str: string): string {
  return str
    .split(' ')
    .map(word => 
      word.length > 0 
        ? word[0].toUpperCase() + word.slice(1).toLowerCase() 
        : ''
    )
    .join(' ');
}

export async function getProductsFromCollection(collectionName:string): Promise<Product[]> {
  const { data: products, error } = await supabase
    .rpc('get_products_from_collection', {
      collection_name: collectionName
    })
    .select(`
      *,
      variations (*),
      images (*),
      category:categories (*)
    `) as { data: DatabaseProduct[], error: any };

  if (error) {
    console.error("Error fetching spotlight products:", error);
    return [];
  }

  return products.map((product): Product => {
    const primaryImage = product.images.find(img => img.is_primary)?.url || "";
    const variations = product.variations || [];
    
    const colors = [...new Set(
      variations
        .map(v => v.color)
        .filter((color): color is string => typeof color === "string")
    )];
    
    const sizes = [...new Set(
      variations
        .map(v => v.size)
        .filter((size): size is string => typeof size === "string")
    )];

    return {
      id: product.id,
      title: product.name,
      description: product.description || "",
      price: product.price,
      imageUrl: primaryImage,
      colorOptions: colors,
      sizes: sizes,
      shipping_duration: product.shipping_duration,
      tag: product.tag || ""
    };
  });
}

export async function getProductsFromCategory(categoryName:string): Promise<Product[]> {
  const { data: products, error } = await supabase
    .rpc('get_products_from_category', {
      category_name: categoryName
    })
    .select(`
      *,
      variations (*),
      images (*),
      category:categories (*)
    `) as { data: DatabaseProduct[], error: any };

  if (error) {
    console.error("Error fetching spotlight products:", error);
    return [];
  }
  console.log(products)

  return products.map((product): Product => {
    const primaryImage = product.images.find(img => img.is_primary)?.url || "";
    const variations = product.variations || [];
    
    const colors = [...new Set(
      variations
        .map(v => v.color)
        .filter((color): color is string => typeof color === "string")
    )];
    
    const sizes = [...new Set(
      variations
        .map(v => v.size)
        .filter((size): size is string => typeof size === "string")
    )];

    return {
      id: product.id,
      title: product.name,
      description: product.description || "",
      price: product.price,
      imageUrl: primaryImage,
      colorOptions: colors,
      sizes: sizes,
      shipping_duration: product.shipping_duration,
      tag: product.tag || ""
    };
  });
}