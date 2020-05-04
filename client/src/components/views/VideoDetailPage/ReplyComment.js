import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [childCommentNum, setChildCommentNum] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    let commentNum = 0;
    props.commentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNum++;
      }
    });
    setChildCommentNum(commentNum);
  }, [props.commentList]);

  const renderMoreComments = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <div key={index} style={{ width: "80%", marginLeft: "40px" }}>
        {comment.responseTo === parentCommentId && (
          <>
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
          </>
        )}
      </div>
    ));
  const onClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div>
      {childCommentNum > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onClick}
        >
          View {childCommentNum} more comment(s)
        </p>
      )}
      {isOpened && renderMoreComments(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
