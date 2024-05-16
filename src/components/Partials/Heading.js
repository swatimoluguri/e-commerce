const Heading = (props) => {
  return (
    <div className="flex flex-col items-center py-4 px-4 mt-0 md:mt-12">
      <div className="flex items-center  my-2 md:my-6">
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
        <div className="font-medium text-lg md:text-3xl">{props.text}</div>
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-12">
          {props.heading}{" "}
          <span className="text-app-green">{props.highlight}</span>
        </h2>
      </div>
    </div>
  );
};
export default Heading;
