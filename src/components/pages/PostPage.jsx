import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Input, Button } from "antd";
import "./PostPage.css";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (postId) {
      fetchPost();
    }

    if (setComments) {
      fetchComments();
    }
  }, [postId]);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleTitleUpdate = async () => {
    if (postId && newTitle.trim() !== "") {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
          { ...post, title: newTitle }
        );
        setPost(response.data);
        setNewTitle("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="post__general">
      <h2>Пост</h2>

      <div className="postcard">
        {post && (
          <Card className="postcard__post__body">
            <div>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          </Card>
        )}
        <Card className="postcard__input">
          <div className="postcard__input__body">
            <Input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Введите заголовок"
            />
            <Button onClick={handleTitleUpdate} className="postcard__button">
              Редактировать
            </Button>
          </div>
        </Card>
      </div>

      <h4>Комментарии к посту:</h4>

      <div className="comments">
        {comments.map((comment) => (
          <>
            <Card size="small" className="comments__cards">
              <div key={comment.id} className="comments__cards__body">
                <h4>
                  Имя: <br />
                  {comment.name}
                </h4>
                <h5>
                  E-Mail:
                  <br /> {comment.email}
                </h5>
                <p>
                  Комментарий: <br />
                  {comment.body}
                </p>
              </div>
            </Card>
          </>
        ))}
      </div>
    </div>
  );
}