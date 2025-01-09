import { supabase } from "./supabase";

export async function getCategories(): Promise<string[]> {
  const { data: categories, error } = await supabase
    .rpc('get_all_category_names')
    .select();

    console.log(categories)

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories || [];
}