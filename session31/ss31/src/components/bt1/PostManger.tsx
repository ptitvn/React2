import { useState } from 'react';
import { Table, Input, Select, Button, Space, Image } from 'antd';
import PostForm from './PostForm';

const { Option } = Select;

function PostManager() {
  const [showForm, setShowForm] = useState(false);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => <Image width={100} src={url} alt="" />,
    },
    {
      title: 'Ngày viết',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
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

  const data = [
    {
      key: 1,
      title: 'Giới thiệu ReactJS',
      image: 'https://via.placeholder.com/100',
      date: '17/09/2025',
      status: 'Đã xuất bản',
    },
    {
      key: 2,
      title: 'Hướng dẫn TypeScript',
      image: 'https://via.placeholder.com/100',
      date: '16/09/2025',
      status: 'Đã xuất bản',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>

      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Nhập từ khóa tìm kiếm" />
        <Select defaultValue="" style={{ width: 160 }}>
          <Option value="">Lọc bài viết</Option>
          <Option value="published">Đã xuất bản</Option>
          <Option value="draft">Chưa xuất bản</Option>
        </Select>
        <Button type="primary" onClick={handleAddClick}>
          Thêm mới bài viết
        </Button>
      </Space>

      {!showForm && <Table columns={columns} dataSource={data} pagination={false} />}

      {showForm && <PostForm />}
    </div>
  );
}

export default PostManager;