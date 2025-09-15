import { productsProps } from "../store/CartSlice";
import AddToCartButton from "./AddToCartButton";

export default function ProductCart({images,title,price,id}:productsProps) {
  return (
    <div className="w-full min-w-40 sm:min-w-45 aspect-[12/16] max-h-[250px] rounded-xl bg-primary hover:scale-105 transition duration-200 ease-linear shadow-[6px_6px_12px_#c5c5c5]  p-3  flex flex-col">
        <img
          src={images[0]}
          alt="Product"
          className="w-full grow rounded-t-xl"
        />
      <div className="flex flex-col h-fit space-y-0.5">
          <p className="title font-semibold text-black text-base leading-5 line-clamp-1">
            {title}
          </p>
          <p className="text-sm text-black">${price}</p>
          <AddToCartButton id={id} />
      </div>
    </div>
  );
}
