"use client";
import Lottie from "lottie-react";
import AuthLoading4 from "../../public/AuthLoading4.json";

const Loading = () => {
  return (
    <div className="loading-container">
      <Lottie
        animationData={AuthLoading4}
        loop={true}
        autoplay={true}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default Loading;
