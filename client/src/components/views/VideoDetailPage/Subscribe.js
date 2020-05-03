import React, { useState, useEffect } from "react";
import Axios from "axios";

function Subscribe(props) {
  const [subscribeNum, setSubscribeNum] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: props.userTo };
    Axios.post("/api/subscribe/subscribeNumber", variable).then((response) => {
      if (response.data.success) {
        setSubscribeNum(response.data.subscriberNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다");
      }
    });

    let subscribedVar = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    Axios.post("/api/subscribe/subscribed", subscribedVar).then((response) => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert("구독 정보를 받아오지 못했습니다");
      }
    });
  }, []);

  const onSubscribe = () => {
    let variable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    if (subscribed) {
      Axios.post("/api/subscribe/unSubscribe", variable).then((response) => {
        if (response.data.success) {
          setSubscribeNum(subscribeNum - 1);
          setSubscribed(!subscribed);
        } else {
          alert("구독 취소 실패");
        }
      });
    } else {
      Axios.post("/api/subscribe/subscribe", variable).then((response) => {
        if (response.data.success) {
          setSubscribeNum(subscribeNum + 1);
          setSubscribed(!subscribed);
        } else {
          alert("구독 실패");
        }
      });
    }
  };

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
          border: 0,
          outline: 0,
        }}
        onClick={onSubscribe}
      >
        {subscribed ? "subscribed" : "subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
