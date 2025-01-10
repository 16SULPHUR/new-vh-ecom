import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface CartProduct {
    product_id: number;
    product_name: string;
    variant_id: number;
    variant_color: string;
    variant_size: string;
    quantity: number;
    primary_image_url: string;
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingQuantity, setUpdatingQuantity] = useState<number | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) {
                setCartItems([]);
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .rpc('get_cart_product_variant_details', {
                    p_cart_id: cartId
                });

            if (error) throw error;
            setCartItems(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error fetching cart items');
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (variantId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setUpdatingQuantity(variantId);

        try {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) throw new Error('No cart found');

            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: newQuantity })
                .eq('cart_id', cartId)
                .eq('variant_id', variantId);

            if (error) throw error;

            // Update local state
            fetchCartItems()

            toast({
                description: "Cart updated successfully",
            });
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Failed to update cart",
            });
        } finally {
            setUpdatingQuantity(null);
        }
    };

    const deleteItem = async (itemToDelete: CartProduct) => {
        if (!itemToDelete) return;

        console.log(itemToDelete)

        try {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) throw new Error('No cart found');

            const { data,error } = await supabase
                .from('cart_items')
                .delete()
                .eq('cart_id', cartId)
                .eq('variant_id', itemToDelete.variant_id);

                console.log(data)
            if (error) throw error;

            // Update local state
            fetchCartItems()

            toast({
                description: "Item removed from cart",
            });
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Failed to remove item",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-red-500">
                {error}
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-xl font-medium">Your cart is empty</h2>
                <Button className="bg-pink-600/70 hover:bg-pink-700">Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-medium mb-8">Shopping Cart ({cartItems.length} items)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <Card key={item.variant_id} className="p-4">
                            <div className="flex gap-4">
                                <div className="w-24 h-24 flex-shrink-0">
                                    <img
                                        src={item.primary_image_url}
                                        alt={item.product_name}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>

                                <div className="flex-grow space-y-2">
                                    <h3 className="font-medium">{item.product_name}</h3>
                                    <div className="text-sm text-muted-foreground">
                                        <p>Color: {item.variant_color}</p>
                                        {item.variant_size && <p>Size: {item.variant_size}</p>}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 border rounded-md">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(item.variant_id, item.quantity - 1)}
                                                disabled={updatingQuantity === item.variant_id}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(item.variant_id, item.quantity + 1)}
                                                disabled={updatingQuantity === item.variant_id}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-500 hover:text-red-600"
                                            onClick={() => deleteItem(item)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <Card className="p-6 space-y-4 sticky top-4">
                        <h2 className="text-lg font-medium">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-medium">
                                <span>Total</span>
                                <span>₹0.00</span>
                            </div>
                        </div>
                        <Button className="w-full bg-pink-600/70 hover:bg-pink-700">
                            Proceed to Checkout
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}