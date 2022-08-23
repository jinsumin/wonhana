import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/354-animated-background-5-lineal-edited.json";

const Animation = () => {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      speed={0.6}
      style={{ width: 50, height: 50 }}
    />
  );
};

export default Animation;
