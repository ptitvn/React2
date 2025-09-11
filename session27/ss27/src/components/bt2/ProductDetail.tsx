import { useParams } from 'react-router-dom';
import { products } from './Product';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <p style={{ padding: '20px', color: 'red' }}>Sản phẩm không tồn tại.</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Chi tiết sản phẩm</h2>
      <h3>{product.name}</h3>
      <p><strong>Giá:</strong> {product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetail;