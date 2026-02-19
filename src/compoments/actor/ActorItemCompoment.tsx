import type { FC } from "react";

type ActorItemProps = {
  name: string;
  image: string;
};

const ActorItemCompoment: FC<ActorItemProps> = ({ name, image }) => {
  return (
    <div className="relative hover:scale-105 transition-transform duration-300">
      <img
        src={`/actors/${image}`}
        alt={name}
        className="w-full h-70 object-cover rounded-lg cursor-pointer bg-gray-600"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 w-full h-10 rounded-b-lg bg-linear-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-0 w-full flex justify-center">
        <span className="text-white text-center absolute bottom-2">
          {" "}
          {name}
        </span>
      </div>
    </div>
  );
};

export default ActorItemCompoment;
