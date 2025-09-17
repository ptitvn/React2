import { useEffect, useState } from 'react';
import { Table, Button, Space, Image, Modal, message } from 'antd';
import { getPosts, updatePost } from '../../bt5/api/postApi';

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
  shouldReload: boolean;
  onReloadHandled: () => void;
}

function PostTable({
  searchKeyword,
  filterStatus,
  shouldReload,
  onReloadHandled,
}: PostTableProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (shouldReload) {
      fetchPosts();
      onReloadHandled(); // reset lại sau khi reload
    }
  }, [shouldReload]);

  const fetchPosts = () => {
    setLoading(true);
    getPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Lỗi khi gọi API:', err))
      .finally(() => setLoading(false));
  };

  const handleBlockClick = (post: Post) => {
    setSelectedPost(post);
    setConfirmVisible(true);
  };

  const handleConfirmBlock = async () => {
    if (!selectedPost) return;

    const newStatus =
      selectedPost.status === 'Đã xuất bản' ? 'Ngừng xuất bản' : 'Đã xuất bản';

    try {
      await updatePost(selectedPost.id, { ...selectedPost, status: newStatus });
      message.success('Cập nhật trạng thái thành công');
      setConfirmVisible(false);
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      message.error('Lỗi khi cập nhật bài viết');
    }
  };

  const filteredData = posts.filter((item) => {
    const matchKeyword = item.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = filterStatus
      ? item.status === (filterStatus === 'published' ? 'Đã xuất bản' : 'Ngừng xuất bản')
      : true;
    return matchKeyword && matchStatus;
  });

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_: any, __: Post, index: number) => index + 1,
    },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => <Image width={100} src={url} alt="Ảnh bài viết" />,
    },
    { title: 'Ngày viết', dataIndex: 'date', key: 'date' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'Đã xuất bản' ? 'green' : 'red' }}>{status}</span>
      ),
    },
    {
      title: 'Chức năng',
      key: 'actions',
      render: (_: any, record: Post) => (
        <Space>
          <Button onClick={() => handleBlockClick(record)}>Chặn</Button>
          <Button type="primary">Sửa</Button>
          <Button danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={false}
        loading={loading}
      />

      <Modal
        title="Xác nhận"
        open={confirmVisible}
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedPost(null);
        }}
        onOk={handleConfirmBlock}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn ngừng xuất bản bài viết?</p>
      </Modal>
    </>
  );
}

export default PostTable;