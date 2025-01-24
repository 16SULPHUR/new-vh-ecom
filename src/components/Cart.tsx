import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import RazorpayCheckout from './pay';

interface CartProduct {
    product_id: number;
    product_name: string;
    variant_id: number;
    variant_color: string;
    variant_size: string;
    quantity: number;
    primary_image_url: string;
    cart_item_id: number;
    variant_stock: number;
    price: number; // Add price field
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
            fetchCartItems();
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

        try {
            const cartId = localStorage.getItem('cartId');
            if (!cartId) throw new Error('No cart found');

            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('cart_id', cartId)
                .eq('variant_id', itemToDelete.variant_id);

            if (error) throw error;
            fetchCartItems();
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Failed to remove item",
            });
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)*100;
    };

    const prepareLineItems = () => {
        console.log(cartItems)
        return cartItems.map((item) => ({
            sku: item.product_id.toString(), // Use product_id as SKU
            variant_id: item.variant_id.toString(), // Use variant_id as variant_id
            price: item.price * 100, // Convert to paise
            offer_price: item.price * 100, // Same as price (no discount)
            tax_amount: 0, // Assuming no tax for now
            quantity: item.quantity,
            name: item.product_name,
            description: `${item.variant_color} - ${item.variant_size}`,
            image_url: new URL(item.primary_image_url).href, // Optional
            notes: {}, // Optional
        }));
    };

    const handleSuccess = (data: {
        paymentId: string;
        orderId: string;
        signature: string;
    }) => {
        console.log('Payment Successful:', data);
        toast({
            description: "Payment successful!",
        });
    };

    const handleFailure = (error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
        orderId: string;
        paymentId: string;
    }) => {
        console.error('Payment Failed:', error);
        toast({
            variant: "destructive",
            description: "Payment failed. Please try again.",
        });
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
                        <Card key={item.cart_item_id} className="p-4">
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
                                    <div className="text-sm text-muted-foreground">
                                        <p>₹ {item.price}</p>
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
                                                onClick={() => updateQuantity(item.variant_id, Math.min(item.variant_stock, item.quantity + 1))}
                                                disabled={updatingQuantity === item.variant_id || item.quantity >= item.variant_stock}
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
                                <span>₹{(calculateTotal() / 100).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-medium">
                                <span>Total</span>
                                <span>₹{(calculateTotal() / 100).toFixed(2)}</span>
                            </div>
                        </div>
                        <RazorpayCheckout
                            keyId="rzp_test_uIVo1z5BDDBq3H"
                            amount={calculateTotal()} // Total amount in paise
                            currency="INR"
                            businessName="Variety Heaven"
                            prefill={{
                                name: 'John Doe',
                                email: 'john.doe@example.com',
                                contact: '9999999999',
                                address: '123, Main Street, City',
                            }}
                            lineItems={prepareLineItems()} // Pass line items
                            onSuccess={handleSuccess}
                            onFailure={handleFailure}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}