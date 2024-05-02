import Shipping from "../assets/shipping.png";
import Payment from "../assets/payment.png";
import Support from "../assets/support.png";

const DetailsStrip = () => {
  return (
    <div className="flex gap-6 py-8 px-16 w-full justify-around">
      <div className="flex items-center gap-2">
        <div>
          <img  className="w-3/4" src={Shipping} alt="Shipping" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">Free Shipping</h1>
          <p className="text-gray-500 font-medium text-lg   ">Free shipping for order above Rs.500</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <img className="w-3/4" src={Payment} alt="Payment" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">Flexible Payment</h1>
          <p className="text-gray-500 font-medium text-lg   ">Multiple secure payment options</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <img className="w-3/4" src={Support} alt="Support" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-2xl">24X7 Support</h1>
          <p className="text-gray-500 font-medium text-lg   ">Our executives are available 24x7</p>
        </div>
      </div>
    </div>
  );
};
export default DetailsStrip;
