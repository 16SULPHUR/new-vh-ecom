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
import { FilterSidebar, SortByButton } from './filterSidebar'

const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

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
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl text-center w-full font-base font-sourceSans">{category}</h1>
            </div>
            <div className='md:flex hidden mb-2 w-full justify-end'>
                <div className='justify-end'>
                    <SortByButton />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <FilterSidebar />

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

