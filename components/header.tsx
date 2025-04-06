"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, Sun, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useCart } from "./cart-provider"
import { products } from "@/lib/products"
import { ThemeToggle } from "./theme-toggle"

interface CartItem {
  id: string
  quantity: number
  // Add other properties if they exist in your cart items
}

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  image?: string
  // Add other properties from your products as needed
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const [expandedCategories, setExpandedCategories] = useState(false)

  const totalItems = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0)

  const routes = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products", hasMegaMenu: true },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowMobileSearch(false)
      setSearchResults([])
    }
  }

  // Dynamic search as user types
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase()
      const results = products
        .filter(
          (product: Product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query),
        )
        .slice(0, 5) // Limit to 5 results
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Close mega menu and mobile search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setShowMegaMenu(false)
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node) && showMobileSearch) {
        setShowMobileSearch(false)
        setSearchResults([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMobileSearch])

  // Close mega menu and mobile search when navigating
  useEffect(() => {
    setShowMegaMenu(false)
    setShowMobileSearch(false)
    setSearchResults([])
  }, [pathname])

  return (
    <header className="sticky dark:bg-gray-900 top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="container flex flex-wrap h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile menu trigger and logo (offcanvas)*/}
        <div className="flex items-center gap-2 ">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="hover:bg-transparent hover:border hover:border-gray-200 hover:text-orange-500">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sun className="h-5 w-5 text-orange-500" />
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    Solar Shine Electro
                  </span>
                </Link>

                
               

                <nav className="flex flex-col gap-4">
                  

                  {routes.map((route) => (
                    <div key={route.path}>
                      {route.hasMegaMenu ? (
                        <div className="space-y-2">
                          <div
                            className="flex items-center justify-between cursor-pointer rounded-lg transition-all ease-in-out duration-200"
                            onClick={() => setExpandedCategories(!expandedCategories)}
                          >
                            <span
                              className={`text-md flex items-center justify-between gap-2  ${pathname === route.path ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
                            >
                              {route.name}
                              <ChevronDown
                                className={`h-5 w-5 transition-transform ${expandedCategories ? "rotate-180" : ""}`}
                              />
                            </span>
                          </div>

                          <div
                            className={` flex font-semibold flex-col gap-2 overflow-hidden transition-all duration-500 ease-in-out ${
                              expandedCategories ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                            }`}
                          >
                            <ul className="space-y-2">
                              <li>
                                <Link
                                  href="/products?category=solar-panels"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                                >
                                  Solar Panels
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/products?category=fans"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                                >
                                  AC/DC Fans
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/products?category=inverters"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                                >
                                  Solar Inverters
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/products?category=batteries"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                                >
                                  Dry Batteries
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={route.path}
                                  onClick={() => setIsMenuOpen(false)}
                                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                                >
                                  All Products
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={route.path}
                          className={`text-md ${pathname === route.path ? "font-medium text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {route.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  

                 
                </nav>

                
              </div>

              <div className="flex p-0 items-center gap-2 font-bold text-md">
                  
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                    Change Theme
                  </span>
                </div>
                  <div className="flex items-center mt-3">
                    <ThemeToggle variant="outline" size="default" showLabel={true} />
                  </div>
            </SheetContent>
          </Sheet>

          {/* Logo - only visible on large screens or when mobile search is not showing on smaller screens */}
          <div className="hidden md:flex items-center justify-center gap-2">
            <Link href="/" className="flex items-center  justify-center gap-2 font-bold text-xl">
              <Sun className="h-6 w-6 text-orange-500" />
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Solar Shine Electro
              </span>
            </Link>
          </div>
        </div>

        {/* Center logo on mobile and tablet - only visible when mobile search is not showing */}
        <div
          className={`md:hidden absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-200 ${showMobileSearch ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <Link href="/" className="flex items-center justify-center gap-2 font-bold text-xl">
            <Sun className="h-6 w-6 text-orange-500" />
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Solar Shine Electro
            </span>
          </Link>
        </div>

        {/* Desktop Navigation (nav items in larger screens) */}
        <nav className="hidden lg:flex items-center justify-center gap-6">
          {routes.map((route) => (
            <div
              key={route.path}
              className="relative flex items-center justify-center"
              ref={route.hasMegaMenu ? megaMenuRef : null}
            >
              {route.hasMegaMenu ? (
                <button
                  className={`text-sm font-medium flex items-center ${pathname.startsWith(route.path) ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
                  onClick={() => setShowMegaMenu(!showMegaMenu)}
                >
                  {route.name}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showMegaMenu ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  href={route.path}
                  className={`text-sm font-medium ${pathname === route.path ? "text-orange-500" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {route.name}
                </Link>
              )}

              {route.hasMegaMenu && showMegaMenu && (
                <div className="absolute top-full left-0 w-[220px] bg-background rounded-md shadow-lg border p-4 grid gap-2 z-50">
                  <Link
                    href="/products?category=solar-panels"
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  >
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Solar Panels"
                      className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 p-1"
                    />
                    <span>Solar Panels</span>
                  </Link>
                  <Link
                    href="/products?category=fans"
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  >
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="AC/DC Fans"
                      className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 p-1"
                    />
                    <span>AC/DC Fans</span>
                  </Link>
                  <Link
                    href="/products?category=inverters"
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  >
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Solar Inverters"
                      className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 p-1"
                    />
                    <span>Solar Inverters</span>
                  </Link>
                  <Link
                    href="/products?category=batteries"
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                  >
                    <img
                      src="/placeholder.svg?height=32&width=32"
                      alt="Dry Batteries"
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 p-1"
                    />
                    <span>Dry Batteries</span>
                  </Link>
                  <div className="pt-2 mt-2 border-t">
                    <Link
                      href="/products"
                      className="text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Search and Cart */}
        <div className="flex items-center md:w-md justify-end">
          {/* Mobile Search - only visible on small screens */}
          <div ref={mobileSearchRef} className="md:hidden relative">
            {showMobileSearch ? (
              <div className="fixed left-0 right-0 top-0 z-50 bg-background h-16 transition-all duration-200 overflow-hidden">
                <div className="container h-full flex items-center  gap-2 p-3">
                  <form onSubmit={handleSearch} className="flex-1 flex items-center h-full">
                    <Input
                      type="search"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 rounded-full h-full border-orange-500 focus-visible:ring-orange-500"
                      autoFocus
                    />
                  </form>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowMobileSearch(false)
                      setSearchQuery("")
                      setSearchResults([])
                    }}
                    className="h-full aspect-square hover:bg-transparent hover:border-2 hover:border-gray-200 hover:text-orange-500"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile search results */}
                {searchResults.length > 0 && (
                  <div className="fixed left-0 right-0 top-16 bg-background shadow-lg border-t p-2 z-50 max-h-[60vh] overflow-y-auto">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                        onClick={() => {
                          setShowMobileSearch(false)
                          setSearchQuery("")
                          setSearchResults([])
                        }}
                      >
                        <img
                          src={product.image || "/placeholder.svg?height=40&width=40"}
                          alt={product.name}
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                      className="block text-center text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 mt-2 pt-2 border-t"
                      onClick={() => {
                        setShowMobileSearch(false)
                        setSearchQuery("")
                        setSearchResults([])
                      }}
                    >
                      View all results
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Button className="hover:bg-transparent hover:border hover:border-gray-200 hover:text-orange-500" variant="ghost" size="icon" aria-label="Search" onClick={() => setShowMobileSearch(true)}>
                <Search className="h-5 w-5 " />
              </Button>
            )}
          </div>

          {/* Desktop Search - visible on medium and large screens */}
          <div className="hidden md:flex relative mr-2" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 rounded-full border-2 border-orange-500 focus-visible:ring-orange-500"
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full rounded-full hover:bg-transparent hover:text-orange-500">
                <Search className="h-4 w-4 " />
              </Button>
            </form>

            {/* Desktop search results */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-background rounded-md shadow-lg border p-2 z-50 max-h-[60vh] overflow-y-auto">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                    onClick={() => {
                      setSearchQuery("")
                      setSearchResults([])
                    }}
                  >
                    <img
                      src={product.image || "/placeholder.svg?height=40&width=40"}
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground truncate">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                  className="block text-center text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 mt-2 pt-2 border-t"
                  onClick={() => {
                    setSearchQuery("")
                    setSearchResults([])
                  }}
                >
                  View all results
                </Link>
              </div>
            )}
          </div>

        <div className="hidden sm:flex relative ">
        <ThemeToggle />
        </div>

        <div className="flex ">
        <Button asChild variant="ghost" size="icon" aria-label="Cart"  className=" hover:bg-transparent hover:border hover:border-gray-200 hover:text-orange-500">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>
       
        </div>

      </div>
    </header>
  )
}

