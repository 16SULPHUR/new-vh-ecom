import { Star, Truck } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toTitleCase } from '@/lib/fetchProducts'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  title: string
  id:number
  price: number
  imageUrl: string
  shipsNow?: boolean
  colorOptions: string[]
  sizes?: string[]
  shipping_duration?: number
  tag: string
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  shipping_duration,
  colorOptions,
  sizes,
  tag
}: ProductCardProps) {
  const displayedColors = colorOptions.slice(0, 4)
  const extraColors = colorOptions.length - 4

  return (
    <Link to={`/product/${id}`}>
      <Card className="w-full max-w-[45vw] sm:max-w-xs overflow-hidden rounded-none border-none shadow-none">
        <div className="relative">
          {tag && (
            <Badge
              className="absolute left-0.5 top-0.5 z-10 bg-pink-600/60 text-white hover:bg-black/90 text-[10px] sm:text-sm rounded-sm font-normal font-sans"
            >
              {toTitleCase(tag)}
            </Badge>
          )}
          <img
            src={imageUrl}
            alt={title}
            className="h-[25vh] sm:h-[45vh] w-full object-cover"
          />
        </div>

        <CardContent className="p-3 sm:p-4">
          <h3 className="font-medium font-serif text-sm sm:text-md line-clamp-2">{toTitleCase(title)}</h3>
          <div className="mt-1 sm:mt-2 text-sm sm:text-base font-semibold font-sans">
            ₹{price.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="flex gap-1 sm:gap-2 items-center">
              {displayedColors.map((color, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  title={color}
                >
                  <div
                    className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
              {extraColors > 0 && (
                <div className="text-xs sm:text-sm text-muted-foreground">
                  +{extraColors}
                </div>
              )}
            </div>
          </div>
          {/* <div className="mt-2 sm:mt-3">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {sizes && sizes.length > 1 ? (
              sizes.map((size, index) => (
                <Badge key={index} variant="outline" className="text-xs sm:text-sm cursor-pointer hover:bg-secondary">
                  {size}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="text-xs sm:text-sm">Free Size</Badge>
            )}
          </div>
        </div> */}
        </CardContent>

        <CardFooter className="flex items-center gap-1 sm:gap-2 border-t p-2 sm:p-4">
          <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
          <span className="text-xs sm:text-sm">Ships in {shipping_duration} Days</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

