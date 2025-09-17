import { useState } from 'react';
import { Input, Select, Button, Space, Modal } from 'antd';
import PostTable from '../components/PostTable';
import PostForm from '../components/PostForm';

const { Option } = Select;

function PostManager() {
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [shouldReload, setShouldReload] = useState(false);

  const handleAddClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handlePostCreated = () => {
    setShowForm(false);      
    setShouldReload(true);     
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Giao diện quản lý bài viết</h2>

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Nhập từ khóa tìm kiếm"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Select
          defaultValue=""
          style={{ width: 160 }}
          onChange={(value) => setFilterStatus(value)}
        >
          <Option value="">Lọc bài viết</Option>
          <Option value="published">Đã xuất bản</Option>
          <Option value="draft">Chưa xuất bản</Option>
        </Select>
        <Button type="primary" onClick={handleAddClick}>
          Thêm mới bài viết
        </Button>
      </Space>

      <PostTable
        searchKeyword={searchKeyword}
        filterStatus={filterStatus}
        shouldReload={shouldReload}
        onReloadHandled={() => setShouldReload(false)} 
      />

      <Modal
        title="Thêm mới bài viết"
        open={showForm}
        onCancel={handleCloseForm}
        footer={null}
        centered
        width={600}
      >
        <PostForm onClose={handlePostCreated} />
      </Modal>
    </div>
  );
}

export default PostManager;