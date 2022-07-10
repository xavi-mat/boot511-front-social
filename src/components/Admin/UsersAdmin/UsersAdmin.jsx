import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, resetUsersData } from '../../../features/admin/adminSlice';
import UserAdmin from './UserAdmin/UserAdmin';
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";

const UsersAdmin = () => {

  const { usersData } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = useState(false);

  const getUsersData = async (page) => {
    setIsSearching(true);
    await dispatch(getUsers(page));
    setIsSearching(false);
  }

  const getInitialUsersData = async () => {
    await dispatch(resetUsersData());
    await getUsersData(1);
  }

  useEffect(() => {
    setIsSearching(true);
    getInitialUsersData();
    // eslint-disable-next-line
  }, [])

  const loadMoreUsers = () => {
    if (isSearching) { return; }
    getUsersData(usersData.page + 1);
  }

  const user = usersData.users?.map(
    (u, i) => <UserAdmin key={u._id + i} user={u} />
  );

  return (
    <div>
      <InfiniteScroll
        dataLength={usersData.users?.length ?? 0}
        next={loadMoreUsers}
        hasMore={usersData.users?.length < usersData.total}
        loader={<Skeleton active />}
        endMessage={<div className="no-more-box">&nbsp;</div>}>
        {user}
      </InfiniteScroll>
    </div>
  )
}

export default UsersAdmin
