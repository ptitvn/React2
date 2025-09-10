import { useParams } from 'react-router-dom';

type Params = {
  name: string;
};

function Student() {
  const { name } = useParams<Params>();

  return (
    <div>
      <p>Tên: {name}</p>
    </div>
  );
}

export default Student;