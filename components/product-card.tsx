import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductCard({ product }) {
  return (
    <div className="group bg-background rounded-lg shadow-sm border dark:border-white overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
        </div>
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500">Featured</Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="outline" className="absolute top-2 right-2 bg-background/80">
            Out of Stock
          </Badge>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-orange-500 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0" asChild>
            <Link href={`/products/${product.id}`}>
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">View product</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

