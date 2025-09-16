import { cartProps } from "../store/CartSlice"
export class Billing{
    private cartData;
     deliveryCharge;
     handlingCharge;
    constructor(cartData:cartProps[],deliveryCharge:number=25,handlingCharge:number=5){
        this.cartData=cartData,
        this.deliveryCharge=deliveryCharge,
        this.handlingCharge=handlingCharge
    }
    get TotalAmount():number{
        return Number(this.cartData?.map(product=>product.price*product.quantity)?.reduce((acc,currentVal)=>{
            return acc+currentVal;
          },0).toFixed(2))
    }
    get TotalDiscount():number{
        return Number(this.cartData
            ?.map(product => {
              const discountAmount = (product.price * product.discountPercentage) / 100;
              return discountAmount * product.quantity;
            })
            .reduce((acc, currentVal) => acc + currentVal, 0).toFixed(2) || 0)
    }
    get GrandTotal():number{
        return Number((this.TotalAmount+this.handlingCharge+this.deliveryCharge).toFixed(2))
    }
    get NetTotal():number{
        return Number((this.GrandTotal-this.TotalDiscount).toFixed(2))
    }
}