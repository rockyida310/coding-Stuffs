import React, { useContext, useEffect, useState } from "react";
import "./singlePost.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Markdown from "../markdown/Markdown";

const SinglePost = () => {
  const Location = useLocation();
  const path = Location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${path}`);
      // console.log(res.data);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
        // this is delete method so we have to write like this
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        description,
        // this is delete method so we have to write like this
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.postImage && (
            <img className="singlePostImage" src={post.postImage} alt="" />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon far fa-edit"
                    onClick={() => setUpdateMode(true)}
                  />
                  <i
                    className="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </h1>
          )}

          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link className="link" to={`/?username=${post.username}`}>
                <b>{post.username}</b>
              </Link>{" "}
            </span>
            <span className="singlePostDate">
              Date: <b>{new Date(post.createdAt).toDateString()}</b>{" "}
            </span>
          </div>
          {updateMode ? (
            <textArea
              type="text"
              value={description}
              className="singlePostDescriptionInput"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          ) : (
            <Markdown
              markdown={description} // className="singlePostDescription"
              className="singlePostDescriptionMarkdown"
            />
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default SinglePost;
