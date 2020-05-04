import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

function Comment(props) {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const onChange = (e) => {
    setComment(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      content: comment,
      writer: user.userData._id,
      videoId: props.videoId,
    };
    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refresh(response.data.result);
      } else {
        alert("댓글 작성 실패");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {/* Comment list */}
      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <div key={index}>
                <SingleComment
                  comment={comment}
                  videoId={props.videoId}
                  refresh={props.refresh}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  commentList={props.commentList}
                  videoId={props.videoId}
                  refresh={props.refresh}
                />
              </div>
            )
        )}
      {/* Root comment form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={onChange}
          value={comment}
          placeholder="댓글을 작성하세요"
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
