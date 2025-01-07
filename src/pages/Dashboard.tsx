import { HeroCarousel } from "@/components/hero-carousel";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import ProductCard from "@/components/productCard";
import { SaleBanner } from "@/components/sale-banner";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    return (
        <div>
            <HeroCarousel />
            {/* <div className="py-8 px-10">
                <SaleBanner />
            </div> */}
            <div className="p-4 flex w-full gap-10">
                <ProductCard
                    title="Feel Regal in Exquisite Lehenga Sets
Slay the festive season in style with our Lehenga sets!"
                    price={6895.00}
                    imageUrl="https://media.varietyheaven.in/images/1736261104439-6323603323860664039.jpg"
                    rating={5}
                    reviewCount={1}
                    shipsIn={4}
                    shipsNow={true}
                    colorOptions={[
                        '#FFB6C1', // Light pink
                        '#FFC0CB', // Pink
                        '#FFE4E1', // Misty rose
                        '#F7CAC9', // Rose pink
                        '#FF69B4', // Hot pink
                        '#DB7093'  // Pale violet red
                    ]}
                    sizes={["S", "M", "L", "XL"]}
                />
                <ProductCard
                    title="Feel Regal in Exquisite Lehenga Sets
Slay the festive season in style with our Lehenga sets! "
                    price={6895.00}
                    imageUrl="https://media.varietyheaven.in/images/1736261104439-6323603323860664039.jpg"
                    rating={5}
                    reviewCount={1}
                    shipsIn={4}
                    shipsNow={true}
                    colorOptions={[
                        '#FFB6C1', // Light pink
                        '#FFC0CB', // Pink
                        '#FFE4E1', // Misty rose
                        '#F7CAC9', // Rose pink
                        '#FF69B4', // Hot pink
                        '#DB7093'  // Pale violet red
                    ]}
                    sizes={[]}
                />
                <ProductCard
                    title="Feel Regal in Exquisite Lehenga Sets
Slay the festive season in style with our Lehenga sets! "
                    price={6895.00}
                    imageUrl="https://media.varietyheaven.in/images/1736261104439-6323603323860664039.jpg"
                    rating={5}
                    reviewCount={1}
                    shipsIn={4}
                    shipsNow={true}
                    colorOptions={[
                        '#FFB6C1', // Light pink
                        '#FFC0CB', // Pink
                        '#FFE4E1', // Misty rose
                        '#F7CAC9', // Rose pink
                        '#FF69B4', // Hot pink
                        '#DB7093'  // Pale violet red
                    ]}
                    sizes={["S", "M", "L", "XL"]}
                />
                <ProductCard
                    title="Feel Regal in Exquisite Lehenga Sets
Slay the festive season in style with our Lehenga sets! "
                    price={6895.00}
                    imageUrl="https://media.varietyheaven.in/images/1736261104439-6323603323860664039.jpg"
                    rating={5}
                    reviewCount={1}
                    shipsIn={4}
                    shipsNow={true}
                    colorOptions={[
                        '#FFB6C1', // Light pink
                        '#FFC0CB', // Pink
                        '#FFE4E1', // Misty rose
                        '#F7CAC9', // Rose pink
                        '#FF69B4', // Hot pink
                        '#DB7093'  // Pale violet red
                    ]}
                    sizes={["S", "M", "L", "XL"]}
                />
            </div>
        </div>
    )
}
