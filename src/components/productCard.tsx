import { Star, Truck } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  title: string
  price: number
  imageUrl: string
  rating: number
  reviewCount: number
  shipsIn: number
  shipsNow?: boolean
  colorOptions: string[]
  sizes?: string[]
}

export default function ProductCard({
  title,
  price,
  imageUrl,
  rating,
  reviewCount,
  shipsIn,
  shipsNow = false,
  colorOptions,
  sizes,
}: ProductCardProps) {
  const displayedColors = colorOptions.slice(0, 4)
  const extraColors = colorOptions.length - 4

  return (
    <Card className="w-full max-w-xs overflow-hidden">
      <div className="relative">
        {shipsNow && (
          <Badge
            className="absolute left-2 top-2 z-10 bg-black text-white hover:bg-black/90"
          >
            Ships Now
          </Badge>
        )}
        <img
          src={imageUrl}
          alt={title}
          className="h-[400px] w-full object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium font-serif">{title}</h3>
        <div className="mt-2 text-xl font-bold font-sans">
          ₹{price.toLocaleString('en-IN')}
        </div>
        <div className="mt-3">
          <div className="text-sm text-muted-foreground mb-2">Colors Available</div>
          <div className="flex gap-2 items-center">
            {displayedColors.map((color, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                title={color}
              >
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                />
                <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            {extraColors > 0 && (
              <div className="text-sm text-muted-foreground">
                +{extraColors}
              </div>
            )}
          </div>
        </div>
        <div className="mt-3">
          <div className="flex flex-wrap gap-2">
            {sizes && sizes.length > 0 ? (
              sizes.map((size, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer hover:bg-secondary">
                  {size}
                </Badge>
              ))
            ) : (
              <Badge variant="outline">Free Size</Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2 border-t p-4">
        <Truck className="h-5 w-5" />
        <span className="text-sm">Ships in {shipsIn} Days</span>
      </CardFooter>
    </Card>
  )
}

