import React, { useState, useEffect } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [subscribeNum, setSubscribeNum] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNum(response.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다");
      }
    });

    let subscribedVar = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/subscribed", subscribedVar).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert("구독 정보를 받아오지 못했습니다");
      }
    });
  }, []);

  return (
    <div>
      {subscribeNum} followers
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={setSubscribed}
      >
        {subscribed ? "subscribed" : "subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
