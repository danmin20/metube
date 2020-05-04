import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import Axios from "axios";
import { useSelector } from "react-redux";

function SingleComment(props) {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const onChange = (e) => {
    setComment(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      content: comment,
      writer: user.userData._id,
      videoId: props.videoId,
      responstTo: props.comment._id,
    };

    Axios.post("/api/comment/saveComment", variable).then((response) => {
      if (response.data.success) {
        props.refresh(response.data.result);
      } else {
        alert("댓글 작성 실패");
      }
    });
  };
  const onOpenReply = () => {
    setOpenReply(!openReply);
  };

  const actions = [
    <span onClick={onOpenReply} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  console.log(props.comment);

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} />}
        content={<p>{props.comment.content}</p>}
      />
      {openReply && (
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
      )}
    </div>
  );
}

export default SingleComment;
