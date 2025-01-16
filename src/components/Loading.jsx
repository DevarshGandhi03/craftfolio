"use client";
import Lottie from "lottie-react";
import AuthLoading from "../../public/AuthLoading.json"


const Loading = () => {
 



    return (
      <div className="loading-container">
        <Lottie animationData={AuthLoading} loop={true} autoplay={true} style={{ width: 400, height: 400 }} />
      </div>
    )
  }

export default Loading;
