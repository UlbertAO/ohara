import {
  BookMarked,
  Dock,
  Search,
  Bookmark,
  Clock,
  Lock,
  Star,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import Navbar from "../components/layout/navbar";
import ParallaxSection from "../components/ui/parallax-section";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Footer from "../components/layout/footer";

// Feature data
const features = [
  {
    icon: BookMarked,
    title: "Vast Collection",
    description:
      "Access millions of books, journals, articles, and multimedia resources from leading publishers worldwide.",
  },
  {
    icon: Dock,
    title: "Multi-Device Access",
    description:
      "Read seamlessly across all your devices with our responsive platform that syncs your progress.",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description:
      "Find exactly what you need with our powerful search capabilities including full-text search across the entire library.",
  },
  {
    icon: Bookmark,
    title: "Personalized Collections",
    description:
      "Create your own collections, add notes, and organize your research in a way that works for you.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "No closing hours. Access your favorite books and resources anytime, anywhere in the world.",
  },
  {
    icon: Lock,
    title: "Secure Access",
    description:
      "State-of-the-art security measures protect your data and provide a safe reading environment.",
  },
];

// Collection data
const collections = [
  {
    title: "Fiction",
    description:
      "Explore imaginative worlds through novels, short stories, and poetry from classic to contemporary.",
    link: "#fiction",
  },
  {
    title: "Academic",
    description:
      "Access scholarly articles, journals, and research papers across various academic disciplines.",
    link: "#academic",
  },
  {
    title: "Science & Tech",
    description:
      "Stay updated with the latest in science, technology, engineering, and mathematics.",
    link: "#science-tech",
  },
  {
    title: "Children's",
    description:
      "Discover engaging stories and educational content designed for young readers of all ages.",
    link: "#children",
  },
];

// Testimonials
const testimonials = [
  {
    text: "The World Book Library has completely changed how I research. I can access any resource I need instantly, and the search functionality is exceptional.",
    name: "Sarah Johnson",
    title: "Professor, University of California",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    text: "As an avid reader, having access to millions of books at my fingertips is a dream come true. The interface is intuitive and the reading experience is seamless.",
    name: "Michael Chen",
    title: "Book Enthusiast",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    text: "I use the World Book Library for both personal reading and student assignments. The ability to create collections and assign reading is a game-changer for educators.",
    name: "Jessica Martinez",
    title: "High School Teacher",
    avatar:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with Parallax */}
        <ParallaxSection
          backgroundImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
          height="100vh"
          // id="home"
        >
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-poppins mb-4">
              Discover the World Through Books
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8">
              Access thousands of books, journals, and resources from anywhere
              in the world. Your digital library awaits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-md text-lg font-medium transition shadow-lg"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-md text-lg font-medium transition shadow-lg"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
              <Link href="/#collections">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-md text-lg font-medium transition shadow-lg"
                >
                  Explore Collections
                </Button>
              </Link>
            </div>
          </div>
        </ParallaxSection>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary font-poppins mb-4">
                Why Choose Our Digital Library
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-secondary">
                We provide a comprehensive digital library experience with
                advanced features designed for readers and researchers alike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-background transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="text-primary mb-4">
                      <feature.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-primary font-poppins mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-secondary">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Section with Parallax */}
        <ParallaxSection
          backgroundImage="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
          // id="collections"
          className="py-16"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-poppins mb-4 text-white">
                Explore Our Collections
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-white">
                Dive into our carefully curated collections spanning various
                genres, subjects, and interests.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collections.map((collection, index) => (
                <Card
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg transition-all duration-300 hover:shadow-lg hover:bg-opacity-20"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-poppins mb-3 text-white">
                      {collection.title}
                    </h3>
                    <p className="mb-4 text-sm text-white/90">
                      {collection.description}
                    </p>
                    <Link
                      href={collection.link}
                      className="text-accent hover:text-white transition duration-300 inline-flex items-center"
                    >
                      <span>Browse {collection.title}</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button className="bg-white text-primary hover:bg-white/90 px-6 py-6 h-auto rounded-md text-lg font-medium transition shadow-lg">
                View All Collections
              </Button>
            </div>
          </div>
        </ParallaxSection>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-primary font-poppins mb-4">
                What Our Members Say
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-secondary">
                Join thousands of satisfied readers who have transformed their
                reading experience with our digital library.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-background transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-secondary italic mb-6">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full mr-4"
                        src={testimonial.avatar}
                        alt={`${testimonial.name} avatar`}
                      />
                      <div>
                        <h4 className="font-bold text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold font-poppins mb-2">10M+</div>
                <p className="text-lg">Books Available</p>
              </div>
              <div className="p-6 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold font-poppins mb-2">
                  2.5M+
                </div>
                <p className="text-lg">Active Members</p>
              </div>
              <div className="p-6 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold font-poppins mb-2">190+</div>
                <p className="text-lg">Countries Served</p>
              </div>
              <div className="p-6 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold font-poppins mb-2">24/7</div>
                <p className="text-lg">Support Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-background rounded-xl shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                    <h2 className="text-3xl font-bold text-primary font-poppins mb-4">
                      Ready to Start Your Reading Journey?
                    </h2>
                    <p className="text-lg text-secondary mb-6">
                      Join our community of readers and researchers today. Get
                      unlimited access to millions of books and resources.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <Link href="/auth">
                        <Button
                          variant="outline"
                          size="lg"
                          className="bg-white border border-primary text-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-primary hover:text-white transition shadow-md w-full sm:w-auto"
                        >
                          Start Free Trial
                        </Button>
                      </Link>
                      <Link href="/#features">
                        <Button
                          variant="outline"
                          size="lg"
                          className="bg-white border border-primary text-primary px-6 py-3 rounded-md text-lg font-medium hover:bg-primary hover:text-white transition shadow-md w-full sm:w-auto"
                        >
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <img
                      src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="Person reading"
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
