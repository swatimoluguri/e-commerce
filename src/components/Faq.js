const Faq = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center my-6">
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
        <div className="font-medium text-3xl">FAQs</div>
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-10">
          Question? <span className="text-app-green">Look here.</span>
        </h2>
      </div>
    </div>
  );
};
export default Faq;
