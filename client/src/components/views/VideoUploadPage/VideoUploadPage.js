import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;
const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];
const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideoUploadPage(props) {
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [privates, setPrivates] = useState(false);
  const [categories, setCategories] = useState("Film & Animation");
  const [filepath, setFilepath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumPath, setThumpath] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onDescriptChange = (e) => {
    setDescript(e.currentTarget.value);
  };
  const onPrivateChange = (e) => {
    setPrivates(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategories(e.currentTarget.value);
  };
  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };
        setFilepath(response.data.url);
        Axios.post("/api/video/thumbnails", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumpath(response.data.url);
          } else {
            alert("썸네일 생성에 실패했습니다");
          }
        });
      } else {
        alert("비디오 업로드를 실패했습니다.");
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      title: title,
      description: descript,
      privacy: privates,
      filePath: filepath,
      category: categories,
      duration: duration,
      thumbnail: thumPath,
    };
    Axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        message.success("업로드 성공");
        props.history.push("/");
      } else {
        alert("비디오 업도르에 실패했습니다");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          {thumPath && (
            <div>
              <img src={`http://localhost:5000/${thumPath}`} alt="thumbnail" />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={title} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptChange} value={descript} />
        <br />
        <br />
        <select onChange={onPrivateChange} value={privates}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange} value={categories}>
          {Category.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
