'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType } from 'embla-carousel'

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/productCard';
import { Product } from '@/lib/types/product';
import { getProductsFromCollection } from '@/lib/fetchProducts';

export function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const data: Product[] = await getProductsFromCollection("Spotlight");
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
    <div className={cn('relative w-full')}>
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex min-h-[400px] w-screen">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_40%] min-w-0 px-1 sm:flex-[0_0_33.333%] md:flex-[0_0_17%] lg:flex-[0_0_18%]"
            >
              <ProductCard {...product}/>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'absolute left-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full',
          !canScrollPrev && 'hidden'
        )}
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={cn(
          'absolute right-1 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full',
          !canScrollNext && 'hidden'
        )}
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  );
}






