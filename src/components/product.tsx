import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/lib/supabase';

type VariantImage = {
    url: string;
    is_primary: boolean;
};

type ColorVariantImages = {
    color: string;
    images: VariantImage[];
};

type ColorVariant = {
    color: string;
    hex_code: string;
};

type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    sku: string;
    fabric: string;
    category_name: string;
    primary_image_url: string;
    color_variants: ColorVariant[];
    size_variants: string[];
    variant_images: ColorVariantImages[];
};

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [expandedAccordions, setExpandedAccordions] = useState<string[]>(['product-details']);
    const { id } = useParams<{ id: string }>();

    const addOns = [
        { id: 'petticoat', name: 'Petticoat', price: 799.00 },
        { id: 'pre-drape', name: 'Pre Drape This Saree', price: 899.00 },
        { id: 'fall-pico', name: 'Fall & Pico (Its a Free Gift For Our Beloved Customers)', price: 0.00 },
    ];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.rpc('get_product_details', { input_product_id: Number(id) }).single();

                    console.log(data)

                if (error) throw error;

                if (data && isValidProduct(data)) {
                    setProduct(data);
                    if (data.color_variants.length > 0) {
                        setSelectedColor(data.color_variants[0].color);
                    }
                } else {
                    setError("Invalid product data");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    function isValidProduct(data: any): data is Product {
        return (
            data &&
            typeof data.id === 'number' &&
            typeof data.name === 'string' &&
            typeof data.description === 'string' &&
            typeof data.price === 'number' &&
            typeof data.sku === 'string' &&
            typeof data.fabric === 'string' &&
            typeof data.category_name === 'string' &&
            typeof data.primary_image_url === 'string' &&
            Array.isArray(data.color_variants) &&
            Array.isArray(data.size_variants) &&
            Array.isArray(data.variant_images)
        );
    }

    const toggleAccordion = (id: string) => {
        setExpandedAccordions(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const getFilteredImages = () => {
        if (!product) return [];
        const variantImages = product.variant_images.find(
            variant => variant.color.toLowerCase() === selectedColor.toLowerCase()
        );
        return variantImages?.images || [];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-red-500">
                {error || 'Product not found'}
            </div>
        );
    }

    const filteredImages = getFilteredImages();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column - Image gallery */}
                <div className="space-y-4">
                    <Card className="overflow-hidden md:ml-24">
                        <img
                            src={filteredImages[0]?.url || product.primary_image_url}
                            alt={product.name}
                            className="w-full aspect-square object-cover"
                        />
                    </Card>

                    <div className="relative md:absolute md:left-0 md:top-0 md:bottom-0 md:w-20">
                        <div className="flex md:flex-col gap-2 overflow-auto md:h-full">
                            {filteredImages.map((image, index) => (
                                <button
                                    key={`image-${index}`}
                                    className="flex-shrink-0 w-20 h-20 border rounded-md overflow-hidden hover:border-primary transition-colors"
                                >
                                    <img
                                        src={image.url}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column - Product details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
                        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-muted-foreground">
                            Rating 5/5 based on 14 reviews
                        </span>
                    </div>

                    <div>
                        <p className="text-2xl font-semibold">₹{parseFloat(product.price).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">(Inclusive of all taxes)</p>
                    </div>

                    <div className="space-y-4">
                        {product.color_variants.length > 0 && (
                            <div>
                                <h3 className="font-medium mb-2">Color:</h3>
                                <RadioGroup
                                    value={selectedColor}
                                    onValueChange={setSelectedColor}
                                    className="flex gap-4"
                                >
                                    {product.color_variants.map((variant) => (
                                        <div key={variant.color} className="flex flex-col items-center gap-2">
                                            <RadioGroupItem
                                                value={variant.color}
                                                id={variant.color}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={variant.color}
                                                className="cursor-pointer"
                                            >
                                                <div
                                                    className="w-8 h-8 rounded-full border-2 peer-checked:border-primary transition-colors"
                                                    style={{ backgroundColor: variant.hex_code }}
                                                />
                                            </Label>
                                            <span className="text-sm">{variant.color}</span>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                        {product.size_variants.length > 0 && product.size_variants[0] !== "" && (
                            <div>
                                <h3 className="font-medium mb-2">Size:</h3>
                                <RadioGroup
                                    value={selectedSize}
                                    onValueChange={setSelectedSize}
                                    className="grid grid-cols-5 gap-2"
                                >
                                    {product.size_variants.map((size) => (
                                        <div key={size} className="flex items-center">
                                            <RadioGroupItem
                                                value={size}
                                                id={`size-${size}`}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={`size-${size}`}
                                                className="w-full cursor-pointer text-center py-2 border rounded-md peer-checked:bg-primary peer-checked:text-white transition-colors"
                                            >
                                                {size}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <button className="text-sm text-primary mt-2">Size Chart</button>
                            </div>
                        )}

                        <div>
                            <h3 className="font-medium mb-2">Quantity:</h3>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center border rounded-md p-2"
                                />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Add-ons:</h3>
                            <div className="space-y-2">
                                {addOns.map((addon) => (
                                    <div key={addon.id} className="flex items-start gap-2">
                                        <Checkbox
                                            id={addon.id}
                                            checked={selectedAddOns.includes(addon.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setSelectedAddOns([...selectedAddOns, addon.id]);
                                                } else {
                                                    setSelectedAddOns(selectedAddOns.filter(id => id !== addon.id));
                                                }
                                            }}
                                        />
                                        <Label htmlFor={addon.id} className="text-sm">
                                            {addon.name}
                                            {addon.price > 0 && ` @ ₹${addon.price.toFixed(2)}`}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Button className="w-full">ADD TO CART</Button>
                        <Button variant="outline" className="w-full">BUY NOW</Button>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-2">
                        <div className="text-blue-600">
                            Ships in 2 business days.
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div
                            className="border rounded-lg cursor-pointer"
                            onClick={() => toggleAccordion('product-details')}
                        >
                            <div className="p-4 flex justify-between items-center">
                                <h3 className="font-medium">Product Details</h3>
                                {expandedAccordions.includes('product-details') ? (
                                    <ChevronUp className="h-5 w-5" />
                                ) : (
                                    <ChevronDown className="h-5 w-5" />
                                )}
                            </div>
                            {expandedAccordions.includes('product-details') && (
                                <div className="px-4 pb-4">
                                    <div className="space-y-4">
                                        <p>{product.description}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="font-medium">Fabric:</span>
                                                <p>{product.fabric}</p>
                                            </div>
                                            <div>
                                                <span className="font-medium">Category:</span>
                                                <p>{product.category_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}