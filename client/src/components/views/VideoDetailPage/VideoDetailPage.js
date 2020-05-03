import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./SideVideo";
import Subscribe from "./Subscribe";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [video, setVideo] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideo(response.data.videoDetail);
      } else {
        alert("비디오 불러오기를 실패했습니다");
      }
    });
  }, []);

  if (video.writer) {
    console.log(video);
    return (
      //   디테일 부분
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.filePath}`}
              controls
            />
            <List.Item
              actions={[
                <Subscribe
                  userTo={video.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={video.writer.image} />}
                title={video.writer.name}
                description={video.description}
              />
            </List.Item>
          </div>
        </Col>
        {/* 사이드 부분 */}
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div></div>;
  }
}

export default VideoDetailPage;
