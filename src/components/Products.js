import Heading from "./Heading";
import Collections from "./Collections";

const Products = () => {
  return (
    <div>
      <div className="flex flex-col items-center bg-[url('assets/bg.jpg')] bg-cover	mb-10">
        <Heading text="Products" heading="" highlight="" />
      </div>
      <Collections />
    </div>
  );
};
export default Products;
