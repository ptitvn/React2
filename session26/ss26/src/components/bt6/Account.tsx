function Account({ user }: { user: any }) {
  return (
    <div>
      <h2>Trang tài khoản</h2>
      <p>Email: {user.email}</p>
      <p>Quyền: {user.role}</p>
    </div>
  );
}

export default Account;