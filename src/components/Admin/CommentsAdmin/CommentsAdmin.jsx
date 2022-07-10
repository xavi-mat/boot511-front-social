import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getComments, resetCommentsData } from "../../../features/admin/adminSlice";
import CommentAdmin from "./CommentAdmin/CommentAdmin";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

const CommentsAdmin = () => {

  const { commentsData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const getCommentsData = async (page) => {
    setIsSearching(true);
    await dispatch(getComments(page));
    setIsSearching(false);
  }

  const getInitialCommentsData = async () => {
    await dispatch(resetCommentsData());
    await getCommentsData(1);
  }

  useEffect(() => {
    setIsSearching(true);
    getInitialCommentsData();
    // eslint-disable-next-line
  }, [])


  const loadMoreComments = () => {
    if (isSearching) { return; }
    getCommentsData(commentsData.page + 1);
  }

  const comment = commentsData.comments?.map(
    (c, i) => <CommentAdmin key={c._id + i} comment={c} />
  );

  return (
    <div>
      <InfiniteScroll
        dataLength={commentsData.comments?.length ?? 0}
        next={loadMoreComments}
        hasMore={commentsData.comments?.length < commentsData.total}
        loader={<Skeleton active />}
        endMessage={<div className="no-more-box">&nbsp;</div>}>
        {comment}
      </InfiniteScroll>
    </div>
  )
}

export default CommentsAdmin