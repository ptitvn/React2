import { Form, Input, Button, Space } from 'antd';
import { ReloadOutlined, SendOutlined } from '@ant-design/icons';

function PostForm() {
  const [form] = Form.useForm();

  const handleReset = () => form.resetFields();
  const handleSubmit = (values: any) => {
    console.log('Dữ liệu bài viết:', values);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 500 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên bài viết"
            name="title"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề bài viết' }]}
          >
            <Input placeholder="Nhập tiêu đề..." />
          </Form.Item>

          <Form.Item
            label="Hình ảnh (URL)"
            name="image"
            rules={[{ required: true, message: 'Vui lòng nhập đường dẫn hình ảnh' }]}
          >
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="content"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết' }]}
          >
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
      </div>
    </div>
  );
}

export default PostForm;