import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sun, Zap, PenToolIcon as Tool, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Professional Solar Installation Services
              </h1>
              <p className="text-white/90 mb-6 text-lg">
                Our team of certified technicians provides expert installation, maintenance, and support for all your
                solar energy needs.
              </p>
              <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-white/90">
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Solar installation service"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Installation Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">
            From initial consultation to final installation and ongoing maintenance, we provide comprehensive solar
            energy solutions for homes and businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            id="residential"
            icon={<Sun className="h-6 w-6" />}
            title="Residential Installation"
            description="Complete solar system installation for homes of all sizes. Includes panels, inverters, and battery storage."
            image="/placeholder.svg?height=300&width=400"
          />

          <ServiceCard
            id="commercial"
            icon={<Zap className="h-6 w-6" />}
            title="Commercial Solutions"
            description="Large-scale installations for businesses, reducing operational costs and carbon footprint."
            image="/placeholder.svg?height=300&width=400"
          />

          <ServiceCard
            id="maintenance"
            icon={<Tool className="h-6 w-6" />}
            title="Maintenance & Support"
            description="Regular maintenance, troubleshooting, and support services to keep your system running optimally."
            image="/placeholder.svg?height=300&width=400"
          />
        </div>
      </section>

      {/* Process */}
      <section className="mb-16">
        <div className="bg-gray-50 rounded-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-gray-900">Our Installation Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a streamlined process to ensure your solar installation is completed efficiently and to the
              highest standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProcessStep
              number="1"
              title="Consultation"
              description="We assess your energy needs and design a custom solar solution for your property."
            />

            <ProcessStep
              number="2"
              title="Proposal"
              description="We provide a detailed proposal including system design, costs, and expected energy production."
            />

            <ProcessStep
              number="3"
              title="Installation"
              description="Our certified technicians install your solar system with minimal disruption to your property."
            />

            <ProcessStep
              number="4"
              title="Activation"
              description="We handle all permits, inspections, and grid connection to get your system up and running."
            />
          </div>
        </div>
      </section>

      {/* Residential Services */}
      <section id="residential" className="mb-16 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Residential Solar Installation</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-200">
              Our residential solar installations are designed to maximize energy production while complementing the
              aesthetics of your home. We handle everything from system design to permitting and grid connection.
            </p>

            <ul className="space-y-3 mb-6">
              <BenefitItem text="Reduce or eliminate your electricity bills" />
              <BenefitItem text="Increase your home's value" />
              <BenefitItem text="Protect against rising energy costs" />
              <BenefitItem text="Reduce your carbon footprint" />
              <BenefitItem text="25+ year system lifespan" />
            </ul>

            <Button asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Residential solar installation"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section id="commercial" className="mb-16 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Commercial solar installation"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Commercial Solar Solutions</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-200">
              Our commercial solar solutions help businesses reduce operational costs and demonstrate their commitment
              to sustainability. We design systems that maximize ROI while minimizing disruption to your operations.
            </p>

            <ul className="space-y-3 mb-6">
              <BenefitItem text="Significant reduction in energy costs" />
              <BenefitItem text="Tax incentives and depreciation benefits" />
              <BenefitItem text="Enhanced corporate social responsibility" />
              <BenefitItem text="Protection against utility rate increases" />
              <BenefitItem text="Scalable solutions for businesses of all sizes" />
            </ul>

            <Button asChild>
              <Link href="/contact">Request a Business Assessment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Maintenance Services */}
      <section id="maintenance" className="mb-16 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Maintenance & Support</h2>
            <p className="text-gray-600 mb-6 dark:text-gray-200">
              Our maintenance and support services ensure your solar system continues to operate at peak efficiency. We
              offer preventative maintenance plans, troubleshooting, and repair services to protect your investment.
            </p>

            <ul className="space-y-3 mb-6">
              <BenefitItem text="Regular system inspections and cleaning" />
              <BenefitItem text="Performance monitoring and optimization" />
              <BenefitItem text="Prompt troubleshooting and repairs" />
              <BenefitItem text="Warranty management and support" />
              <BenefitItem text="System upgrades and expansions" />
            </ul>

            <Button asChild>
              <Link href="/contact">Learn About Maintenance Plans</Link>
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Solar system maintenance"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-200">
            Don't just take our word for it. Here's what our satisfied customers have to say about our installation
            services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Testimonial
            quote="The installation team was professional and efficient. Our system has been performing flawlessly for over a year now."
            author="John D."
            location="Residential Customer"
          />

          <Testimonial
            quote="Switching to solar has reduced our business's energy costs by 70%. The ROI has been better than expected."
            author="Sarah M."
            location="Business Owner"
          />

          <Testimonial
            quote="Their maintenance service is top-notch. They quickly identified and fixed an issue that would have gone unnoticed."
            author="Michael R."
            location="Homeowner"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Harness the Power of the Sun?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our team is ready to help you transition to clean,
            renewable solar energy.
          </p>
          <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-white/90">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ id, icon, title, description, image }) {
  return (
    <div id={id} className="bg-white rounded-lg shadow-sm border overflow-hidden scroll-mt-20">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={`/contact?service=${id}`}
          className="text-orange-500 hover:text-orange-600 font-medium inline-flex items-center"
        >
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function ProcessStep({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2 dark:text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function BenefitItem({ text }) {
  return (
    <li className="flex items-start">
      <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5 mr-2" />
      <span>{text}</span>
    </li>
  )
}

function Testimonial({ quote, author, location }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="text-yellow-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold dark:text-gray-900">{author}</p>
        <p className="text-gray-500 text-sm">{location}</p>
      </div>
    </div>
  )
}

