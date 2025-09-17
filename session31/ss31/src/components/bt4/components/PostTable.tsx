import { useEffect, useState } from 'react';
import { Table, Button, Space, Image } from 'antd';
import { getPosts } from '../api/postApi';

interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  status: string;
}

interface PostTableProps {
  searchKeyword: string;
  filterStatus: string;
}

function PostTable({ searchKeyword, filterStatus }: PostTableProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.error('Lỗi khi gọi API:', err));
  }, []);

  const filteredData = posts.filter((item) => {
    const matchKeyword = item.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = filterStatus
      ? item.status === (filterStatus === 'published' ? 'Đã xuất bản' : 'Chưa xuất bản')
      : true;
    return matchKeyword && matchStatus;
  });

  const columns = [
    { title: 'STT', dataIndex: 'id', key: 'id' },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => <Image width={100} src={url} alt="Ảnh bài viết" />,
    },
    { title: 'Ngày viết', dataIndex: 'date', key: 'date' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Chức năng',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="default">Chặn</Button>
          <Button type="primary">Sửa</Button>
          <Button danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={filteredData} rowKey="id" pagination={false} />;
}

export default PostTable;