import { Divider, List, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const TryScroll = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const loadMoreData = () => {
    if (loading) { return; }
    setLoading(true);
    setTimeout(() => {
      const moreData = Array(10).fill(Math.random().toString());
      setData([...data, ...moreData]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreData();
  // eslint-disable-next-line
  }, []);

  return (
    <div
      // id="scrollableDiv"
      style={{
        // height: 400,
        // overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }
      }
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain > It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item} >
              <List.Item.Meta
                title={item}
                description={item + item}
              />
              <div>Content </div>
            </List.Item>
          )
          }
        />
      </InfiniteScroll>
    </div>
  );
};

export default TryScroll
