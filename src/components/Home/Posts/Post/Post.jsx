import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = () => {

  const { posts } = useSelector((state) => state.posts);

  const post = posts.posts?.map((post) => {
    return (
      <div key={post._id}>
        <Link to={"/post/" + post.id}>
          <div>{post.title}</div>
        </Link>
      </div>
    );
  });

  return (
    <div>{post}</div>
  )
}

export default Post