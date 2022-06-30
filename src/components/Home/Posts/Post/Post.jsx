import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = () => {

  const { posts } = useSelector((state) => state.posts);

  const post = posts.posts?.map((post) => {
    return (
      <div key={post._id}>
        <Link to={"/post/" + post._id}>{post.title}</Link>
      </div>
    );
  });

  return (<>
    <div>Total posts: {posts.total}</div>
    <div>Current page: {posts.page}</div>
    <div>Max Pages: {posts.maxPages}</div>
    <div>{post}</div>
  </>
  )
}

export default Post