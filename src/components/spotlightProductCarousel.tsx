"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import 'swiper/css/pagination';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/productCard"
import type { Product } from "@/lib/types/product"
import { getProductsFromCollection } from "@/lib/fetchProducts"

export function ProductCarousel() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const navigationPrevRef = React.useRef<HTMLButtonElement>(null)
  const navigationNextRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getProductsFromCollection("Spotlight")
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={cn("relative w-full")}>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={8}
        slidesPerView={2.2}
        loop={true}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current
          }
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.5,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 5.5,
            spaceBetween: 16,
          },
        }}
        className="w-full min-h-[400px]"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="h-full">
              <ProductCard {...product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        ref={navigationPrevRef}
        variant="outline"
        size="icon"
        className="absolute left-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full"
      >
        <ChevronLeft className="h-8 w-8" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        ref={navigationNextRef}
        variant="outline"
        size="icon"
        className="absolute right-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full"
      >
        <ChevronRight className="h-8 w-8" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

