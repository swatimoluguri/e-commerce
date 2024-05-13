import Heading from "../Partials/Heading";
import Collections from "../Partials/Collections";
import { useEffect } from "react";

const Products = () => {
  useEffect(() => {
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
  }, []);
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
