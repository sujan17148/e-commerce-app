import { useContext, useMemo } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { FaShippingFast } from "react-icons/fa";
import { IoShieldOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import Loader from "../Components/Loader"

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryList />
      <FeatureSection />
    </>
  );
}

function HeroSection() {
  const { data, isLoading, error } = useContext(ProductsContext);
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Loader className="h-screen w-full"/>
      ) : error ? (
        <div className="min-h-[85dvh] flex items-center justify-center">
          Error
        </div>
      ) : (
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-fit"
        >
          {data?.products.slice(0, 9).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="h-fit min-h-[85dvh] py-15 md:py-25 text-center md:text-left p-5 lg:px-25 md:flex flex-row-reverse items-center">
                <div className="right-section flex justify-center items-center md:w-1/2 mb-10 md:mb-0">
                  <img
                    src={product.image}
                    alt="product"
                    className="object-cover rounded-full w-full max-w-[400px] lg:max-w-2/3 h-auto hover:scale-105 transition duration-100 ease-linear"
                  />
                </div>
                <div className="left-section md:w-1/2 flex flex-col justify-center">
                  <h1 className=" title font-bold sm:text-3xl md:text-5xl max-w-2xl line-clamp-3 ">
                    {product.title}
                  </h1>
                  <p className="description font-medium text-base line-clamp-3 my-5 max-w-2xl">
                    {product.description}
                  </p>
                  <button
                    onClick={() => navigate(`/products/details/${product.id}`)}
                    className="custom-button bg-accent "
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
}

function CategoryList() {
  const { data, error, isLoading } = useContext(ProductsContext);
  const categories = useMemo(() => {
    return [...new Set(data?.products.map((product) => product.category))];
  }, [data]);
  return (
    <div className="h-[120px] flex gap-2.5 items-center justify-center flex-wrap p-5 mg:px-10">
      {isLoading ? (
        <div className=" loader h-full flex items-center justify-center">
          Loading...
        </div>
      ) : error ? (
        <div className="error h-full flex items-center justify-center">
          Error
        </div>
      ) : (
        categories?.map((category, index) => (
          <Link
          to={`/category/${category}`} 
           key={index}>
            <button className="custom-button bg-accent capitalize  ">
              {category}
            </button>
          </Link>
        ))
      )}
    </div>
  );
}

function FeatureSection() {
  return (
    <div className="detailsSection my-25 flex justify-center flex-wrap gap-5 p-5 md:px-10">
      <FeaturesDetailsCard
        Icon={FaShippingFast}
        heading="Free Shipping"
        description="Free delivery on orders over $50"
      />
      <FeaturesDetailsCard
        Icon={IoShieldOutline}
        heading="Secure Payment"
        description="100% secure payment processing"
      />
      <FeaturesDetailsCard
        Icon={BiSupport}
        heading="24/7 Support"
        description="Round-the-clock customer service"
      />
    </div>
  );
}

function FeaturesDetailsCard({ Icon, heading, description }) {
  return (
    <div className="aspect-[16/10] w-96 rounded-2xl shadow-[6px_6px_12px_#c5c5c5]  flex flex-col items-center justify-center text-center space-y-4 py-3 px-5 hover:scale-105 transition duration-300 ease-linear">
      <Icon className="py-4 rounded-full bg-secondary h-15 w-15  text-primary " />
      <p className="text-xl font-bold">{heading}</p>
      <p>{description}</p>
    </div>
  );
}
