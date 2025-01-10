import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

interface CartItem {
  id: number;
  cart_id: string;
  variant_id: number;
  quantity: number;
  created_at: string;
}

interface AddToCartResponse {
  success: boolean;
  items?: CartItem[];
  error?: string;
}

export const addToCart = async (
  variantId: number,
  quantity: number,
  existingCartId?: string
): Promise<AddToCartResponse> => {
  try {
    // Use existing cart ID or generate a new one
    const cartId = existingCartId || uuidv4();

    // Call the manage_cart function
    const { data, error } = await supabase
      .rpc('manage_cart', {
        p_cart_id: cartId,
        p_variant_id: variantId,
        p_quantity: quantity
      });

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('No data returned from cart operation');
    }

    // Store cart ID in local storage for future use
    if (!existingCartId) {
      localStorage.setItem('cartId', cartId);
    }

    return {
      success: true,
      items: data as CartItem[]
    };

  } catch (error) {
    console.error('Error adding to cart:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while adding to cart'
    };
  }
};

// Helper function to get stored cart ID
export const getStoredCartId = (): string | null => {
  try {
    return localStorage.getItem('cartId');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

// Helper function to clear cart
export const clearCart = (): void => {
  try {
    localStorage.removeItem('cartId');
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};

// Helper function to get cart items
export const getCartItems = async (cartId: string): Promise<CartItem[] | null> => {
  try {
    const { data, error } = await supabase
      .rpc('manage_cart', {
        p_cart_id: cartId,
        p_variant_id: 0, // Passing 0 as we just want to retrieve items
        p_quantity: 0
      });

    if (error) throw error;

    return data as CartItem[];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return null;
  }
};