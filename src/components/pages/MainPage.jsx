import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Space, Button } from "antd";
import "./MainPage.css";

export default function MainPage() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPosts = async (userId) => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedUserId !== null) {
      fetchPosts(selectedUserId);
    }
  }, [selectedUserId]);

  const handleClick = (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      setPosts([]);
    } else {
      setSelectedUserId(userId);
    }
  };

  return (
    <div className="main_div">
      <h2>Список пользователей</h2>
      {users.map((user) => (
        <Space direction="vertical" size={16} key={user.id}>
          <Card
            className="main__card"
            title={
              <Button
                className="main__card__button"
                onClick={() => handleClick(user.id)}
              >
                {user.name}
              </Button>
            }
          >
            {selectedUserId === user.id && (
              <div>
                {posts.map((post) => (
                  <div className="main__posts" key={post.id}>
                    <h4>
                      <Link to={`/message/${user.id}/${post.id}`}>
                        Пост №{post.id}: {post.title}
                      </Link>
                    </h4>
                    <p>{post.body}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Space>
      ))}
    </div>
  );
}
