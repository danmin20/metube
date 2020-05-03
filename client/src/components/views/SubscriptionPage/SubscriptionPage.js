import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col, Avatar } from "antd";
import moment from "moment";
import Axios from "axios";
const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [video, setVideo] = useState([]);
  let variable = { userFrom: localStorage.getItem("userId") };

  useEffect(() => {
    Axios.post("/api/video/getSuscriptionVideos", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert("구독 비디오 불러오기를 실패했습니다");
      }
    });
  }, []);

  const renderCards = video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var secondes = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
            <div className="duration">
              <span>
                {minutes} : {secondes}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description={video.description}
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{video.views} views</span> -{" "}
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Subscribed</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
