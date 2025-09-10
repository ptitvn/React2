import { useParams } from 'react-router-dom';
function ProductDetail() {
  const { id } = useParams();

  return (
    <div>
      <p>Mã sản phẩm: {id}</p>
    </div>
  );
}

export default ProductDetail;