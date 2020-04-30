import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";

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

function VideoUploadPage() {
  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");
  const [privates, setPrivates] = useState(false);
  const [categories, setCategories] = useState("Film & Animation");

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

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop multiple maxSize>
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
          <div>
            <img src alt />
          </div>
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
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;