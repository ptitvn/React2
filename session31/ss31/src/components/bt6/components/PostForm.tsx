import { Form, Input, Button, Space, Modal, message } from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createPost, getPosts } from '../api/postApi';

function PostForm({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm();
  const [confirmResetVisible, setConfirmResetVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const forbiddenWords = ['cấm', 'bậy', 'xấu']; // từ cấm ví dụ

  const handleReset = () => {
    setConfirmResetVisible(true);
  };

  const confirmReset = () => {
    form.resetFields();
    setConfirmResetVisible(false);
  };

  const handleSubmit = async (values: any) => {
    const { title } = values;

    if (!title || title.trim() === '') {
      setWarningMessage('Tên bài viết không được phép để trống');
      setWarningVisible(true);
      return;
    }

    const posts = await getPosts().then(res => res.data);
    const isDuplicate = posts.some((post: any) => post.title === title);
    if (isDuplicate) {
      setWarningMessage('Tên bài viết không được phép trùng');
      setWarningVisible(true);
      return;
    }

    const containsForbidden = forbiddenWords.some(word =>
      title.toLowerCase().includes(word)
    );
    if (containsForbidden) {
      setWarningMessage('Tên bài viết chứa từ cấm');
      setWarningVisible(true);
      return;
    }

    try {
      await createPost({
        ...values,
        date: new Date().toISOString().split('T')[0],
        status: 'Đã xuất bản',
      });
      message.success('Bài viết đã được xuất bản');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Lỗi khi lưu bài viết');
    }
  };

  return (
    <div>
      

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Tiêu đề bài viết" name="title">
          <Input placeholder="Nhập tiêu đề..." />
        </Form.Item>

        <Form.Item label="Hình ảnh (URL)" name="image">
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item label="Nội dung mô tả" name="content">
          <Input.TextArea rows={6} placeholder="Nhập nội dung..." />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              Làm mới
            </Button>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Xuất bản
            </Button>
          </Space>
        </Form.Item>
      </Form>

      <Modal
        title="Xác nhận"
        open={confirmResetVisible}
        onCancel={() => setConfirmResetVisible(false)}
        onOk={confirmReset}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa toàn bộ dữ liệu trong form?</p>
      </Modal>

      <Modal
        title="Cảnh báo"
        open={warningVisible}
        onCancel={() => setWarningVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setWarningVisible(false)}>
            Hủy
          </Button>,
        ]}
      >
        <p>{warningMessage}</p>
      </Modal>
    </div>
  );
}

export default PostForm;


