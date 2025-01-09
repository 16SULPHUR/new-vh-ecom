import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Button } from "@/components/ui/button";

interface images {
  url: string
}
interface props {
  images: images[]
}


const ProductCarousel = ({ images }:props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-full">
      <PhotoProvider>
        <div className="relative h-full">
          {images.map((image, index) => (
            <PhotoView key={index} src={image.url}>
              <div
                className={`absolute w-full h-full transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={image.url}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-contain cursor-zoom-in bg-black"
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;