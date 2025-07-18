import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">About ShopCraft</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-secondary">ShopCraft</span>, your go-to destination for curated collections of high-quality products across fashion, lifestyle, electronics, and more. We’re here to make online shopping simple, delightful, and rewarding.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At ShopCraft, our mission is to bring craftsmanship and convenience together. We believe shopping should be seamless and full of surprises — offering handpicked products at great prices, backed by dependable service.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary">Why Choose ShopCraft?</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Carefully selected, top-quality products across multiple categories</li>
            <li>Fast, secure, and trackable shipping</li>
            <li>Friendly and responsive customer support</li>
            <li>Simple returns and a smooth shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-secondary">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We aim to redefine the online shopping experience by blending technology with thoughtful design. Our vision is to build a trusted platform where quality meets convenience — for everyone, everywhere.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-secondary mb-2">Be Part of ShopCraft</h3>
          <p className="text-gray-700 mb-4">
            Whether you're looking to upgrade your lifestyle, find unique products, or simply enjoy better shopping — ShopCraft is here for you.
          </p>
          <Link to={"/products"}>
            <button className="bg-accent text-white font-semibold px-6 py-2 rounded hover:scale-105 transition duration-300">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
