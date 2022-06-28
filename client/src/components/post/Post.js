import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
// import Markdown from "../markdown/Markdown"

const Post = ({ post }) => {
  return (
    <>
      <div className="post">
        {post.postImage && (
          <img className="postImage" src={post.postImage} alt="" />
        )}

        <div className="postInfo">
          <div className="postCategories">
            {post.categories.map((category) => (
              <span className="postCategory">{category}</span>
            ))}
          </div>
          <Link to={`/post/${post._id}`} className="link">
            <span className="postTitle">{post.title}</span>
          </Link>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {/* <Markdown markdown={post.description} className="postDescription" /> */}
        <hr />
      </div>
    </>
  );
};

export default Post;
