export interface Product {
    id: number
    title: string
    description: string | null
    price: number
    imageUrl: string
    rating: number
    reviewCount: number
    shipsIn: number
    shipsNow: boolean
    colorOptions: string[]
    sizes: string[]
    shipping_duration:number
    tag:string
  }