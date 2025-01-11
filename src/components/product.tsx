import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Plus, Minus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Truck, TruckIcon, LucideTruck, Clock4Icon, ShoppingBag } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from '@/lib/supabase';
import ZoomableImage from './zoomable-image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { format, min, parseISO } from 'date-fns'
import { addToCart } from '@/lib/bagManager';
import { useToast } from '@/hooks/use-toast';

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
    varient_id: number
    varient_stock:number
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
    variant_id: number
};

export default function ProductPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [mainImage, setMainImage] = useState<string | null | undefined>(product?.primary_image_url || "");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [maxQuantity, setMaxQuantity] = useState<number>(1);
    const [selectedVarientId, setSelectedVarientId] = useState<number>();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [expandedAccordions, setExpandedAccordions] = useState<string[]>(['product-details']);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams<{ id: string }>();

    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const { toast } = useToast();

    const addOns = [
        { id: 'petticoat', name: 'Petticoat', price: 799.00 },
    ];

    useEffect(() => {
        setCurrentImageIndex(0);
        if (product && selectedColor) {
            const selectedVariant = product.color_variants.find(
                variant => variant.color.toLowerCase() === selectedColor.toLowerCase()
            );
            if (selectedVariant) {
                setSelectedVarientId(selectedVariant.varient_id);
                setMaxQuantity(selectedVariant.varient_stock)
                setQuantity(1)
            }
        }
        setCurrentImageIndex(0);
    }, [selectedColor]);


    const handleTouchStart = (e: any) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: any) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) {
            // Swiped left
            setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
        }

        if (distance < 0) {
            // Swiped right
            setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
        }

        // Reset values
        setTouchStart(0);
        setTouchEnd(0);
    };

    const handleMouseDown = (e: any) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;
        setTouchEnd(e.clientX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;

        const distance = startX - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Dragged left
                setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
            } else {
                // Dragged right
                setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
            }
        }

        setIsDragging(false);
        setStartX(0);
        setTouchEnd(0);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase.rpc('get_product_details', { input_product_id: Number(id) }).single();

                if (error) throw error;

                if (data && isValidProduct(data)) {
                    console.log(data)
                    setProduct(data);
                    setMainImage(data.primary_image_url);
                    if (data.color_variants.length > 0) {
                        setSelectedColor(data.color_variants[0].color);
                        setSelectedVarientId(data.color_variants[0].varient_id);
                        setMaxQuantity(data.color_variants[0].varient_stock)
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

    const handleThumbnailClick = (imageUrl: string) => {
        setMainImage(imageUrl);  // Only update the main image
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    async function addItemsToCart() {
        if (selectedVarientId) {
            const cartDetails = await addToCart(selectedVarientId, quantity);
            if (cartDetails.success) {
                console.log(cartDetails)
                toast({
                    title: "Product added to cart",
                    description: "Your Order is Eligible For Free Shipping",
                });
            }
        }
    }

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

    const getPrimaryImageForColor = (color: string) => {
        if (!product) return null;
        const variantImages = product.variant_images.find(
            variant => variant.color.toLowerCase() === color.toLowerCase()
        );
        return variantImages?.images.find(img => img.is_primary)?.url || variantImages?.images[0]?.url;
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
        <div className="container mx-auto px-1 py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left column - Image gallery */}
                <div className="space-y-4">
                    {/* <Card className="overflow-scroll sm:overflow-hidden md:ml-24 flex rounded-none h-[60vh] sm:h-[85vh]"> */}
                    <Card className="overflow-hidden relative md:ml-24 flex rounded-none h-[60vh] sm:h-[85vh] shadow-none">

                        {/* <PhotoProvider key={selectedColor}>
                            {filteredImages.map((image, index) => (
                                <PhotoView src={image.url || product.primary_image_url}>
                                    <img
                                        src={image.url || product.primary_image_url}
                                        alt={product.name}
                                        className="w-full aspect-square object-cover cursor-pointer cursor-zoom-in"
                                    />
                                </PhotoView>
                            ))}
                        </PhotoProvider> */}
                        <PhotoProvider key={selectedColor}>
                            <div
                                className="relative w-full h-full"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                            >
                                {filteredImages.map((image, index) => (
                                    <PhotoView key={index} src={image.url}>
                                        <div
                                            className={`absolute inset-0 transition-opacity duration-300 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                                }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`${product.name} view ${index + 1}`}
                                                className="w-full h-full object-contain cursor-zoom-in"
                                            />
                                        </div>
                                    </PhotoView>
                                ))}
                            </div>
                        </PhotoProvider>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white z-10 hidden sm:flex"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-white z-10 hidden sm:flex"
                            onClick={nextImage}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>

                    </Card>

                    <div className="absolute sm:hidden left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {filteredImages.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 border-black outline outline-1 outline-black rounded-full transition-colors ${index === currentImageIndex ? 'bg-primary' : 'bg-background'
                                    }`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>

                    {/* <div className="relative md:absolute md:left-0 md:top-0 md:bottom-0 md:w-20">
                        <div className="flex md:flex-col gap-2 overflow-auto md:h-full">
                            {filteredImages.map((image, index) => (
                                <button
                                    key={`image-${index}`}
                                    className="flex-shrink-0 w-20 h-20 border rounded-md overflow-hidden hover:border-primary transition-colors"
                                    onClick={() => handleThumbnailClick(image.url)}
                                >
                                    <img
                                        src={image.url}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div> */}

                </div>

                {/* Right column - Product details */}
                <div className="space-y-6 ms-2">
                    <div>
                        <h1 className="text-lg font-serif mb-2">{product.name}</h1>
                        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                    </div>

                    <div>
                        <p className="text-2xl font-medium"><span className='text-base font-normal'>M.R.P.: </span>
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(parseFloat(product.price))}

                        </p>
                        <p className="text-sm text-muted-foreground">(Inclusive of all taxes)</p>
                    </div>

                    <div className="space-y-4">
                        {product.color_variants.length > 0 && (
                            <div>
                                <h3 className="font-medium mb-2">Color:</h3>
                                <RadioGroup
                                    value={selectedColor}
                                    onValueChange={setSelectedColor}
                                    className="flex flex-wrap gap-4"
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
                                                <div className="w-16 h-16 rounded-md overflow-hidden border-2 peer-checked:border-primary transition-colors">
                                                    <img
                                                        src={getPrimaryImageForColor(variant.color) || product.primary_image_url}
                                                        alt={variant.color}
                                                        className="w-full h-full object-cover"
                                                        onClick={() => setMainImage(getPrimaryImageForColor(variant.color))}
                                                    />
                                                </div>
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

                            <div className="flex items-center gap-2 outline outline-1 w-32 justify-between">
                                <Button
                                    className='outline-none shadow-none border-none'
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                {quantity}
                                <Button
                                    className='outline-none shadow-none border-none'
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                                    disabled={quantity >= maxQuantity}
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



                    {/* DESKTOP */}
                    <div className="hidden sm:flex relative w-full py-4">
                        <Button onClick={addItemsToCart} className="w-96 bg-pink-600/70 focus:bg-pink-600 hover:bg-pink-700">ADD TO CART</Button>
                    </div>

                    <div className="flex-col gap-3 flex items-start">
                        <div className="bg-blue-50 w-full px-4 py-2 rounded-lg text-blue-600 flex gap-3">
                            <Clock4Icon /> <span>Ships in 2 business days.</span>
                        </div>
                        <div className="bg-green-50 w-full px-4 py-2 rounded-lg text-green-600 flex gap-3">
                            <img src="/free-shipping.svg" width={30} alt="" /> <span>Free Delivery on all order within India.</span>
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
                {/* MOBILE */}
                <div className="flex fixed sm:hidden justify-center bottom-0 w-screen bg-primary-foreground py-4 rounded-t-2xl shadow-black shadow-2xl">
                    <Button onClick={addItemsToCart} className="w-96 bg-pink-600/70 focus:bg-pink-600 hover:bg-pink-700"> <ShoppingBag size={20} /> Add To Bag</Button>
                </div>
            </div>
        </div>
    );
}