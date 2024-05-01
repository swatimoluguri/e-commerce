import Bg from "../assets/bg.jpg";

const Banner=()=>{
    return (
        <div className="h-screen/2 ">
            <img className=" object-cover w-full" src={Bg} alt="backgroud" />
        </div>
    );
}
export default Banner;