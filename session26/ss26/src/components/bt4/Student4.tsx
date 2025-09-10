import { useSearchParams } from 'react-router-dom';

function Student4() {
  const [searchParams] = useSearchParams();
  const studentName = searchParams.get('studentName');

  return (
    <div>
      {studentName ? (
        <p>Kết quả tìm kiếm: <strong>{studentName}</strong></p>
      ) : (
        <p>Không có từ khóa tìm kiếm trong URL</p>
      )}
    </div>
  );
}

export default Student4;