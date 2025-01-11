'use client'

import { useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Eye } from 'lucide-react'
import { getProductsFromCategory } from '@/lib/fetchProducts'
import { useParams } from 'react-router-dom'
import { Product } from '@/lib/types/product'
import ProductCard from './productCard'

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

const products = [
    {
        id: 1,
        name: "Moonlit Elegance Readymade Blouse",
        price: 2795.00,
        shipsIn: "4 Days",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3puAUKRwlLlfUcvZB4hN6vrMJMJuBX.png",
        colors: ['black', 'gold']
    },
    {
        id: 2,
        name: "Adwitha Green Kalamkari Print Atrangi Blouse",
        price: 2295.00,
        shipsIn: "7 Days",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3puAUKRwlLlfUcvZB4hN6vrMJMJuBX.png",
        colors: ['green', 'red', 'yellow', 'black']
    },
    // Add more products as needed
]

export default function Categories() {
    const [priceRange, setPriceRange] = useState([695, 4995])
    const [inStock, setInStock] = useState(false)
    const [readyToShip, setReadyToShip] = useState(false)
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    getProductsFromCategory(category || "saree")

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data: Product[] = await getProductsFromCategory(category || "saree");
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{category}</h1>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="space-y-8">
                    <div>
                        <h3 className="font-medium mb-4">Price Range</h3>
                        <Slider
                            defaultValue={[695, 4995]}
                            max={4995}
                            min={695}
                            step={100}
                            value={priceRange}
                            onValueChange={setPriceRange}
                            className="mb-2"
                        />
                        <div className="flex justify-between">
                            <span>₹{priceRange[0]}</span>
                            <span>₹{priceRange[1]}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Availability</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="in-stock"
                                    checked={inStock}
                                    onCheckedChange={setInStock}
                                />
                                <label htmlFor="in-stock">Display In-stock Product</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Delivery</h3>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="ready-to-ship"
                                    checked={readyToShip}
                                    onCheckedChange={setReadyToShip}
                                />
                                <label htmlFor="ready-to-ship">Ready to Ship</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-4">Size</h3>
                        <div className="space-y-2">
                            {sizes.map((size) => (
                                <div key={size} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`size-${size}`}
                                        checked={selectedSizes.includes(size)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedSizes([...selectedSizes, size])
                                            } else {
                                                setSelectedSizes(selectedSizes.filter(s => s !== size))
                                            }
                                        }}
                                    />
                                    <label htmlFor={`size-${size}`}>{size}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-[0_0_45%] min-w-0 px-1 sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%]"
                        >
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

