import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

function ListUser() {
    const users = useSelector((state: RootState) => state.userState.users);

    return (
        <div>
            <h2>Danh sách người dùng</h2>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Địa chỉ</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.userName}</td>
                            <td>{user.gender}</td>
                            <td>{user.dateBirth}</td>
                            <td>{user.address}</td>
                            <td>
                                <button>Sửa</button>
                                <button>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListUser;