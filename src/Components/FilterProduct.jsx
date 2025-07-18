//in the category section the name value of radio button were same which means i can check only one at a time but when i use this filterProduct component more that one time then the same name value is shared among components but among all radio buttons only one can be checked at a time so it was causign unexpected behaviour between components. To solve this we used useId hook which is unique for each component i used name ="category-uniqueId" where uniqueId=useId() so our name value  for radio button is different in each component solving the issue


import {useState,useContext,useEffect,useId} from "react"
import { ProductsContext } from "../Context/ProductsContext";
import useDebounce from "../Hooks/useDebounce";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

export default function FilterProducts({ product,className,setCurrentPage}) {
  const { setFilteredProduct } = product;
  const { data, error, isLoading } = useContext(ProductsContext);

  //search section
  const [searchValue, setSearchValue] = useState("");
  const { debouncedValue } = useDebounce(searchValue);
  //category section
  const [selectedcategory, setSelectedCategory] = useState("all");
  //brands
  const [selectedBrand, setSelectedBrand] = useState("all");

  //pricerange
  const [rangeValue, setRangeValue] = useState(5804);

  //filtering products
  useEffect(() => {
    if (!data?.products) return;
    let products = data.products;
    if (rangeValue !== null)
      products = products?.filter((product) => product.price <= rangeValue);
    if (selectedcategory !== "all")
      products = products.filter(
        (product) => product.category == selectedcategory
      );
    if (selectedBrand !== "all")
      products = products.filter((product) => product.brand == selectedBrand);
    if(debouncedValue.trim()!==""){
      products=products.filter(product=>product.title.toLowerCase().includes(debouncedValue.trim().toLowerCase()) ||product.category.toLowerCase().includes(debouncedValue.trim().toLowerCase()) || product.brand.toLowerCase().includes(debouncedValue.trim().toLowerCase()))
    }

    setFilteredProduct(()=>{
      setCurrentPage(1)
    return products
    });
  }, [data, rangeValue, selectedBrand, selectedcategory, debouncedValue]);

  function handleReset(e) {
    e.preventDefault();
    setRangeValue(5804);
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSearchValue("")
  }
  return (
    <>
      {!isLoading && !error && (
        <div
          className={`${className} filter-section  min-h-[40dvh] h-fit rounded text-black bg-[#EEF0F1] my-3 sm:w-62 p-3`}
        >
          <p className="font-bold mb-2">Filter</p>
          <SearchBar search={{ searchValue, setSearchValue }} />
          <Category
            data={data}
            category={{ selectedcategory, setSelectedCategory }}
          />
          <BrandsDropDown
            data={data}
            brand={{ selectedBrand, setSelectedBrand }}
          />
          <PriceRange priceRange={{ rangeValue, setRangeValue }} />
          <button
            onClick={(e) => handleReset(e)}
            className="bg-accent px-3 py-2 w-2/3 font-bold text-lg text-primary rounded hover:scale-105 transition duration-200 ease-linear mt-5"
          >
            Reset
          </button>
        </div>
      )}
    </>
  );
}

 function SearchBar({ search }) {
  const { searchValue, setSearchValue } = search;
  return (
    <div className="flex items-center justify-between p-2 focus-within:border-accent  focus-within:border-2 rounded">
      <input
        className="w-full outline-none  "
        type="text"
        placeholder="Search Products..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <IoSearchSharp className="text-xl text-gray-400 " />
    </div>
  );
}
function Category({ data, category }) {
  const categoryList = [
    ...new Set(data?.products.map((product) => product.category)),
  ];
  const { selectedcategory, setSelectedCategory } = category;
  return (
    <div className="w-full">
      <p className="my-2 font-bold">Categories</p>
      <div className="flex items-center">
        <input
          type="radio"
          name={`category`}
          id="all"
          value="all"
          checked={selectedcategory ==="all"}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="mr-2  appearance-none h-3 w-3 ring-secondary checked:bg-secondary  ring-2 rounded-full"
        />
        <label className="capitalize" htmlFor="all">
          all
        </label>
      </div>

      {/* //rendering categoryies  */}
      {categoryList.map((category, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            name={`category`}
            id={category}
            value={category}
            checked={selectedcategory === category}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mr-2 appearance-none h-3 w-3 ring-secondary checked:bg-secondary  ring-2 rounded-full"
          />
          <label className="capitalize" htmlFor={category}>
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}

function BrandsDropDown({ data, brand }) {
  const { selectedBrand, setSelectedBrand } = brand;
  const brands = [...new Set(data?.products.map((product) => product.brand))];
  return (
    <div className="brands mt-5">
      <p className="font-bold my-2">Brands</p>
      <div className="options relative ">
        <IoIosArrowDown className="absolute text-xl text-primary  top-3 right-2" />
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="inline-block bg-secondary text-primary font-semibold outline-none w-full p-2 appearance-none rounded"
        >
          <option value="all">All</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand} className="capitalize">
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PriceRange({ priceRange }) {
  const { rangeValue, setRangeValue } = priceRange;
  return (
    <div className="price-range mt-7">
      <p className="font-bold my-2">Price Range</p>
      <p className="text-base">Price Range:$0-${rangeValue}</p>
      <input
        type="range"
        min="0"
        max="5804"
        value={rangeValue}
        onChange={(e) => setRangeValue(Number(e.target.value))}
        className="appearance-none bg-secondary rounded-xl w-full h-2 outline-none accent-accent"
      />
    </div>
  );
}