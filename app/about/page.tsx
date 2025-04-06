import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Solar Shine Electro</h1>
            <p className="text-gray-600 mb-6 text-lg dark:text-gray-300">
              We're on a mission to make sustainable energy accessible to everyone. Since 2010, we've been providing
              high-quality solar products and installation services to homes and businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" className="border dark:border-white">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Solar Shine Electro team"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Company history"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3 className="text-xl font-semibold mb-4">From Small Beginnings to Industry Leaders</h3>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              Solar Shine Electro was founded in 2010 by a group of engineers passionate about renewable energy. What
              started as a small shop selling solar panels has grown into a comprehensive solar solutions provider.
            </p>
            <p className="text-gray-600 mb-4 dark:text-gray-300">
              Our journey began with a simple mission: to make solar energy accessible, affordable, and reliable for
              everyone. Over the years, we've expanded our product range and services while maintaining our commitment
              to quality and customer satisfaction.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Today, we're proud to be one of the leading solar equipment suppliers in the region, with thousands of
              successful installations and satisfied customers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16 bg-gray-50 py-12 rounded-lg">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-900">Our Values</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-950">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600  dark:text-gray-300">
                We never compromise on the quality of our products and services. We source from reputable manufacturers
                and maintain strict quality control.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-950">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                <Users className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our customers are at the heart of everything we do. We listen to your needs and provide personalized
                solutions that work for you.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm dark:bg-gray-950">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                <Award className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We stay at the forefront of solar technology, constantly updating our product range with the latest
                innovations in renewable energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Team</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-100">
            Meet the dedicated professionals who make Solar Shine Electro the company it is today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TeamMember name="John Smith" position="Founder & CEO" image="/placeholder.svg?height=300&width=300" />
          <TeamMember
            name="Sarah Johnson"
            position="Technical Director"
            image="/placeholder.svg?height=300&width=300"
          />
          <TeamMember
            name="Michael Chen"
            position="Head of Installation"
            image="/placeholder.svg?height=300&width=300"
          />
          <TeamMember
            name="Emily Rodriguez"
            position="Customer Service Manager"
            image="/placeholder.svg?height=300&width=300"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-white mb-2">5000+</div>
                <div className="text-white/90">Installations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-white mb-2">12+</div>
                <div className="text-white/90">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/90">Team Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-white/90">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-800">Ready to Switch to Solar?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made the switch to clean, renewable energy with Solar Shine
            Electro.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            >
              <Link href="/products">Shop Products</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function TeamMember({ name, position, image }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-lg dark:text-gray-900">{name}</h3>
        <p className="text-gray-600">{position}</p>
      </div>
    </div>
  )
}

