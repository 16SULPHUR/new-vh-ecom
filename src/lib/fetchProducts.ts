import { supabase } from "./supabase";
import type { Product } from "../lib/types/product";

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


export async function getSpotlightProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      variations (*),
      images (*),
      category:categories (*)
    `)
    .limit(10);

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return products.map((product) => {
    const primaryImage =
      product.images.find((img: any) => img.is_primary)?.url || "";
    const variations = product.variations || [];
    
    // Explicitly cast to string[]
    const colors = [
      ...new Set(
        variations
          .map((v: any) => v.color)
          .filter((color:any) => typeof color === "string")
      ),
    ] as string[];
    
    const sizes = [
      ...new Set(
        variations
          .map((v: any) => v.size)
          .filter((size:any) => typeof size === "string")
      ),
    ] as string[];

    return {
      id: product.id,
      title: product.name,
      description: product.description || "",
      price: product.price,
      imageUrl: primaryImage,
      rating: 5,
      reviewCount: 1,
      shipsIn: 4,
      shipsNow: true,
      colorOptions: colors, // Cast ensures this is string[]
      sizes: sizes, // Cast ensures this is string[]hi
      shipping_duration: product.shipping_duration,
      tag:product.tag
    };
  });
}
