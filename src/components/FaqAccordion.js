import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const FaqAccordion = () => {
  const [faqs, setFaqs] = useState([]);
  const [visibleAnswerId, setVisibleAnswerId] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);
  const fetchFaqs = () => {
    fetch("http://localhost:3000/faqs")
      .then((response) => response.json())
      .then((result) => {
        setFaqs(result);
      })
      .catch((error) => console.error("Error fetching faqs:", error));
  };

  const handleFaqClick = (id) => {
    setVisibleAnswerId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div className="flex flex-col w-1/2 mx-auto gap-6">
      {faqs.map((item) => (
        <div key={item._id}>
          <div
            className={`border border-gray-400 p-4 rounded-xl font-semibold cursor-pointer flex justify-between ${
              visibleAnswerId === item._id ? "bg-app-green text-white" : ""
            }`}
            id={"ques_" + item._id}
            onClick={() => handleFaqClick(item._id)}
          >
            <div className="flex flex-col">
              <div>{item.question}</div>
              <div
                className={`overflow-hidden font-normal text-sm ${
                  visibleAnswerId === item._id
                    ? "py-4 rounded-xl transition-all duration-300 max-h-128"
                    : "max-h-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
            <div>
              <FontAwesomeIcon
                className={`${
                  visibleAnswerId === item._id
                    ? "text-app-yellow"
                    : "text-app-green"
                }`}
                icon={visibleAnswerId === item._id ? faMinus : faPlus}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FaqAccordion;
