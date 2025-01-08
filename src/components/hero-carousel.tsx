// import { useState, useEffect } from 'react'
// import { Button } from './ui/button'
// import { cn } from '../lib/utils'

// const carouselItems = [
//     {
//         id: 1,
//         title: 'the WINTER wardrobe',
//         subtitle: 'Chase the Chill in Style',
//         imageDesktop: '/HeroBanners/desktop/1.jpg',
//         imageMobile: '/HeroBanners/mobile/1.jpg',
//         ctaText: 'SHOP NOW',
//         ctaLink: '/winter-collection',
//     },
//     {
//         id: 2,
//         title: 'The WEDDING Wardrobe',
//         subtitle: 'Bridesmaid Beauties',
//         imageDesktop: '/HeroBanners/desktop/2.jpg',
//         imageMobile: '/HeroBanners/mobile/2.jpg',
//         ctaText: 'SHOP NOW',
//         ctaLink: '/wedding-collection',
//     },
//     {
//         id: 3,
//         title: 'The WEDDING Wardrobe',
//         subtitle: 'Bridesmaid Beauties',
//         imageDesktop: '/HeroBanners/desktop/3.jpg',
//         imageMobile: '/HeroBanners/mobile/3.jpg',
//         ctaText: 'SHOP NOW',
//         ctaLink: '/wedding-collection',
//     },
// ]

// export function HeroCarousel() {
//     const [currentSlide, setCurrentSlide] = useState(0)

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
//         }, 5000)
//         return () => clearInterval(timer)
//     }, [])

//     return (
//         <div className="relative">
//             <div className="relative w-screen h-[300px] md:h-[90vh] overflow-hidden">
//                 {carouselItems.map((item, index) => (
//                     <div
//                         key={item.id}
//                         className={cn(
//                             "absolute inset-0 transition-opacity duration-1000",
//                             index === currentSlide ? "opacity-100" : "opacity-0"
//                         )}
//                     >
//                         <img
//                             src={item.imageDesktop}
//                             alt={item.title}
//                             style={{
//                                 objectFit: "cover",
//                                 width: "100vw", // Full width of the viewport
//                                 height: "100%", // Full height of the parent container
//                             }}
//                             className="hidden md:block"
//                         />
//                         <img
//                             src={item.imageMobile}
//                             alt={item.title}
//                             className="block md:hidden object-cover w-screen h-full"
//                         />
//                         <div className="absolute inset-0 bg-black/20" />
//                         <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
//                             <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
//                             <p className="text-xl md:text-2xl mb-8">{item.subtitle}</p>
//                             <Button
//                                 size="lg"
//                                 className="bg-white text-black hover:bg-white/90"
//                             >
//                                 <a href={item.ctaLink}>{item.ctaText}</a>
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//                 {carouselItems.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrentSlide(index)}
//                         className={cn(
//                             "w-2 h-2 rounded-full transition-all",
//                             index === currentSlide ? "bg-white w-4" : "bg-white/50"
//                         )}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"
import { useInterval } from '../hooks/useInterval'
import { type CarouselApi } from './ui/carousel'

interface CarouselItem {
    id: number;
    title: string;
    subtitle: string;
    imageDesktop: string;
    imageMobile: string;
    ctaText: string;
    ctaLink: string;
}

const carouselItems: CarouselItem[] = [
    {
        id: 1,
        title: 'the WINTER wardrobe',
        subtitle: 'Chase the Chill in Style',
        imageDesktop: '/HeroBanners/desktop/1.jpg',
        imageMobile: '/HeroBanners/mobile/1.jpg',
        ctaText: 'SHOP NOW',
        ctaLink: '/winter-collection',
    },
    {
        id: 2,
        title: 'The WEDDING Wardrobe',
        subtitle: 'Bridesmaid Beauties',
        imageDesktop: '/HeroBanners/desktop/2.jpg',
        imageMobile: '/HeroBanners/mobile/2.jpg',
        ctaText: 'SHOP NOW',
        ctaLink: '/wedding-collection',
    },
    {
        id: 3,
        title: 'The WEDDING Wardrobe',
        subtitle: 'Bridesmaid Beauties',
        imageDesktop: '/HeroBanners/desktop/3.jpg',
        imageMobile: '/HeroBanners/mobile/3.jpg',
        ctaText: 'SHOP NOW',
        ctaLink: '/wedding-collection',
    },
]

export function HeroCarousel() {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const scrollToNext = useCallback(() => {
        if (api) {
            api.scrollNext()
        }
    }, [api])

    useInterval(() => {
        if (current === count - 1) {
            // If we're at the last slide, scroll to the first
            api?.scrollTo(0)
        } else {
            scrollToNext()
        }
    }, 5000)

    return (
        <Carousel setApi={setApi} className="relative w-screen">
            <CarouselContent>
                {carouselItems.map((item) => (
                    <CarouselItem key={item.id}>
                        <div className="relative w-screen h-[35vh] md:h-[70vh] overflow-hidden">
                            <img
                                src={item.imageDesktop}
                                alt={item.title}
                                style={{
                                    objectFit: "cover",
                                    width: "100vw",
                                    height: "100%",
                                }}
                                className="hidden md:block"
                            />
                            <img
                                src={item.imageMobile}
                                alt={item.title}
                                className="block md:hidden object-cover w-screen h-full"
                            />
                            {/* <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
                                <p className="text-xl md:text-2xl mb-8">{item.subtitle}</p>
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90"
                                >
                                    <a href={item.ctaLink}>{item.ctaText}</a>
                                </Button>
                            </div> */}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            current === index ? "bg-white w-4" : "bg-white/50"
                        )}
                    />
                ))}
            </div>
        </Carousel>
    )
}

