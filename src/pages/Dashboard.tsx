import { HeroCarousel } from "@/components/hero-carousel";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import ProductCard from "@/components/productCard";
import { ProductCarousel } from "@/components/spotlightProductCarousel";
import { SaleBanner } from "@/components/sale-banner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LatestProductCarousel } from "@/components/latestProductsCarousel";

export default function Dashboard() {
    
    return (
        <div>
            <HeroCarousel />

            <div className="container py-8 px-0.5 w-screen max-w-[90vw]">
                <h3 className="text-xl sm:text-2xl text-center tracking-tight mb-6 font-serif">
                    Spotlight Selections
                </h3>
                <ProductCarousel/>
            </div>
            
            <div className="container py-8 px-0.5 w-screen max-w-[90vw]">
                <h3 className="text-xl sm:text-2xl text-center tracking-tight mb-6 font-serif">
                    New Arrivals
                </h3>
                <LatestProductCarousel/>
            </div>
        </div>
    )
}
