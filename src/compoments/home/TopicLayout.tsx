import { useRef } from "react";
import { Link } from "react-router-dom";
import { DATA_TOPIC } from "../../helpers/typeData";

const bgColors = [
  "bg-amber-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-red-300",
  "bg-yellow-300",
  "bg-indigo-300",
  "bg-indigo-300",
];

const TopicLayout = () => {
  const divRefs = useRef<HTMLDivElement[]>([]);
  return (
    <div className="mx-16">
      <div className="grid grid-cols-6 gap-2 ">
        {DATA_TOPIC.slice(0, 5).map((item, index: number) => {
          return (
            <Link to={`/chu-de/${item.slug}`} key={item.id}>
              <div
                ref={(el) => {
                  if (el) divRefs.current[index] = el;
                }}
                className={`p-10 ${bgColors[index]} cursor-pointer rounded-xl transition-transform duration-300 hover:-translate-y-2`}
              >
                <span className="flex justify-center items-center align-middle font-bold text-white text-xl">
                  {item.title}
                </span>
              </div>
            </Link>
          );
        })}
        <Link to="/chu-de">
          <div
            ref={(el) => {
              if (el) divRefs.current[DATA_TOPIC.length - 5 || 10] = el;
            }}
            className="p-10 bg-cyan-800 cursor-pointer rounded-xl"
          >
            <span className="flex justify-center items-center align-middle font-bold text-white text-xl">
              + {`${DATA_TOPIC.length - 5}` || "10"} Chủ đề
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TopicLayout;
