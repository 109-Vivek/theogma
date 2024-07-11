import React from "react";
import GlyphButton from "./glyph_button/GlyphButton";

const Home = () => {
  return (
      <div className=" absolute top-0 left-0 right-0 bottom-0  w-full overflow-hidden">
        <div className="text-center w-full h-full text-7xl absolute top-0 left-0 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4">
            <GlyphButton text={"THE OGMA"} speed={0.4} />
          </div>
        </div>
      </div>
  );
};

export default Home;
