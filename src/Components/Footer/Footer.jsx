import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter,FaInstagram } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-primary shadow-[6px_6px_36px_#b5b5b5]">
      <div className="container  px-5 lg:px-10 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Shop<span className="text-secondary">Craft</span></span>
            </Link>
            <p className="text-muted-foreground">
              Your one-stop destination for premium quality products at unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                Home
              </Link>
              <Link to="/products" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                Products
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                About Us
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                Contact Us
              </a>
              <a href="#" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                Shipping Info
              </a>
              <a href="#" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                Returns
              </a>
              <a href="#" className="block text-muted-foreground hover:text-secondary transition-colors duration-200">
                FAQs
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-200">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-200">
                < FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-200">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors duration-200">
                <IoMdMail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
          <p>&copy; 2024 ShopCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
