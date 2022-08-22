import Image from "next/image";
import React from "react";

const Intro = () => {
  return (
    <>
      <header className="relative flex items-center justify-center h-screen mb-12 overflow-hidden bg-black">
        <div className="relative z-30 p-5 text-2xl text-white bg-purple-400 bg-opacity-50 rounded-xl">
          This is WONHANA web page!
        </div>
        <video
          playsInline
          autoPlay
          muted
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none opacity-40"
        >
          <source
            src="https://static.toss.im/3d/toss-im-web-intro.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </header>
    </>
  );
};

export default Intro;
