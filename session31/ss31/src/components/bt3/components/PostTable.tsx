import { Table, Button, Space, Image } from 'antd';

interface PostTableProps {
  searchKeyword: string;
  filterStatus: string;
}

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
    status: 'Chưa xuất bản',
  },
];

function PostTable({ searchKeyword, filterStatus }: PostTableProps) {
  const filteredData = data.filter((item) => {
    const matchKeyword = item.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = filterStatus ? item.status === (filterStatus === 'published' ? 'Đã xuất bản' : 'Chưa xuất bản') : true;
    return matchKeyword && matchStatus;
  });

  const columns = [
    { title: 'STT', dataIndex: 'key', key: 'key' },
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

  return <Table columns={columns} dataSource={filteredData} pagination={false} />;
}

export default PostTable;