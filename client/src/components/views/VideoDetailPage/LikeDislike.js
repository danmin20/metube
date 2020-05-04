import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

function LikeDislike(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [dislikeAction, setDislikeAction] = useState(false);
  let variable = {};
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }
  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        // 좋아요 개수
        setLikes(response.data.likes.length);
        // 이미 좋아요 눌렀는지
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction(true);
          }
        });
      } else {
        alert("좋아요 정보 가져오기 실패");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        // 싫어요 개수
        setDislikes(response.data.dislikes.length);
        // 이미 싫어요 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction(true);
          }
        });
      } else {
        alert("싫어요 정보 가져오기 실패");
      }
    });
  }, []);

  const onLike = () => {
    if (!likeAction) {
      Axios.post("/api/like/upLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes + 1);
          setLikeAction(true);
          if (dislikeAction) {
            setDislikeAction(false);
            setDislikes(dislikes - 1);
          }
        } else {
          alert("좋아요 실패");
        }
      });
    } else {
      Axios.post("/api/like/unLike", variable).then((response) => {
        if (response.data.success) {
          setLikes(likes - 1);
          setLikeAction(false);
        } else {
          alert("좋아요 취소 실패");
        }
      });
    }
  };
  const onDislike = () => {
    if (!dislikeAction) {
      Axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction(true);
          if (likeAction) {
            setLikeAction(false);
            setLikes(likes - 1);
          }
        } else {
          alert("싫어요 실패");
        }
      });
    } else {
      Axios.post("/api/like/unDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(dislikes - 1);
          setDislikeAction(false);
        } else {
          alert("싫어요 취소 실패");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={likeAction ? "filled" : "outlined"}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={dislikeAction ? "filled" : "outlined"}
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
      </span>
      &nbsp;&nbsp;
    </div>
  );
}

export default LikeDislike;
