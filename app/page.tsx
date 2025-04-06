import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, ArrowRight } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"
import { products } from "@/lib/products"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-400 py-5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="max-w-md space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">Harness the Power of the Sun</h1>
                <p className="text-white text-lg">
                  Sustainable energy solutions for your home and business. Quality solar panels, inverters, fans, and
                  batteries.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                    <Link href="/products">Shop Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white bg-transparent hover:bg-white hover:text-orange-500"
                  >
                    <Link href="/services">Services</Link>
                  </Button>
                </div>
              </div>
              <div className="relative w-full max-w-sm md:max-w-md">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Solar panel installation"
                  className="rounded-lg shadow-lg"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground dark:text-gray-900">Our Product Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Solar Panels"
              icon="/placeholder.svg?height=80&width=80"
              href="/products?category=solar-panels"
              description="High-efficiency panels for all needs"
            />
            <CategoryCard
              title="AC/DC Fans"
              icon="/placeholder.svg?height=80&width=80"
              href="/products?category=fans"
              description="Energy-efficient cooling solutions"
            />
            <CategoryCard
              title="Solar Inverters"
              icon="/placeholder.svg?height=80&width=80"
              href="/products?category=inverters"
              description="Convert solar power to usable electricity"
            />
            <CategoryCard
              title="Dry Batteries"
              icon="/placeholder.svg?height=80&width=80"
              href="/products?category=batteries"
              description="Reliable energy storage solutions"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts products={products.slice(0, 4)} />

      {/* Services Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground dark:text-gray-900">Our Installation Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto dark:text-gray-600">
              We provide professional installation services for all your solar energy needs. Our team of experts ensures
              your system is set up correctly and efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Residential Installation</h3>
              <p className="text-muted-foreground mb-4">
                Complete solar system installation for homes of all sizes. Includes panels, inverters, and battery
                storage.
              </p>
              <Link
                href="/services#residential"
                className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Commercial Solutions</h3>
              <p className="text-muted-foreground mb-4">
                Large-scale installations for businesses, reducing operational costs and carbon footprint.
              </p>
              <Link
                href="/services#commercial"
                className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Maintenance & Support</h3>
              <p className="text-muted-foreground mb-4">
                Regular maintenance, troubleshooting, and support services to keep your system running optimally.
              </p>
              <Link
                href="/services#maintenance"
                className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium inline-flex items-center"
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button asChild className="dark:border dark:border-gray-900">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-background dark:bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold dark:text-gray-900 text-center mb-8 text-foreground">
            Why Choose Solar Shine Electro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Quality Products"
              description="We source only the highest quality solar equipment with industry-leading warranties."
            />
            <FeatureCard
              title="Expert Support"
              description="Our team of solar experts is ready to help you find the perfect solution for your needs."
            />
            <FeatureCard
              title="Easy Installation"
              description="We provide detailed guides and support for DIY installation, or can recommend professional installers."
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for the latest products, special offers, and solar energy tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-md flex-1" required />
            <Button className="bg-white text-orange-500 hover:bg-white/90">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ title, icon, href, description }) {
  return (
    <Link
      href={href}
      className="bg-background rounded-lg shadow-md p-6 text-center transition-transform hover:scale-105"
    >
      <div className="inline-flex items-center justify-center mb-4">
        <img src={icon || "/placeholder.svg"} alt={title} className="w-16 h-16 object-contain" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-muted rounded-lg p-6 dark:bg-slate-950">
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

