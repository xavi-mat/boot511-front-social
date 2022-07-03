import { Pagination } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAll, reset } from "../../../../features/posts/postsSlice";

const Post = () => {

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(posts.page);

  const onPageChange = async (page) => {
    setCurrentPage(page);
    await dispatch(getAll(page));
    dispatch(reset());
  }

  const post = posts.posts?.map((post) => {
    return (
      <div className="post-box" key={post._id}>
        <div className="avatar-box">
          <img
            src={post.author.avatar}
            className="avatar"
            alt={post.author.username} />
        </div>
        <div className="content-box">
          <div className="post-author">{post.author.username}</div>
          <div>{post.text}</div>
          {post.image ?
            <div><img className="post-image" src={post.image} alt="" /></div>
            :
            null
          }
          <Link to={"/post/" + post._id}>GO TO POST</Link>
        </div>
      </div>
    );
  });

  const paginationBar = (
    <div>
      <Pagination
        current={currentPage}
        onChange={onPageChange}
        total={posts.total}
        showSizeChanger={false}
      />
    </div>
  );

  return (<>
    {paginationBar}
    <div>{post}</div>
    {paginationBar}
  </>
  )
}

export default Post