import React, { useEffect, useState } from "react";
import Axios from "axios";

function SideVideo() {
  const [side, setSide] = useState([]);
  useEffect(() => {
    Axios.get("/api/video/getvideos").then((response) => {
      if (response.data.success) {
        setSide(response.data.videos);
      } else {
        alert("비디오 불러오기를 실패했습니다");
      }
    });
  }, []);

  const renderSide = side.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var secondes = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href style={{ color: "gray" }}>
            <div style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </div>
            <div>{video.writer.name}</div>
            <div>{video.views} views</div>
            <div>
              {minutes} : {secondes}
            </div>
          </a>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }} />
      {renderSide}
    </React.Fragment>
  );
}

export default SideVideo;
