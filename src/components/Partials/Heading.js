const Heading = (props) => {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex items-center my-6">
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
        <div className="font-medium text-3xl">{props.text}</div>
        <div className=" bg-app-yellow h-1 w-8 rounded-xl mx-7"></div>
      </div>
      <div>
        <h2 className="text-5xl font-bold mb-12">
          {props.heading}{" "}
          <span className="text-app-green">{props.highlight}</span>
        </h2>
      </div>
    </div>
  );
};
export default Heading;
