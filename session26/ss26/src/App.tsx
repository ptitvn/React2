import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/bt1/ProductDetail';
import Student from './components/bt2/Student';
import Student4 from './components/bt4/Student4';
import Student3 from './components/bt3/Student3';
import Login from './components/bt6/Login';
import PrivateRouter from './components/bt6/PrivateRouter';
import Account from './components/bt6/Account';
import { useState } from 'react';
// import Login from './components/bt5/Login';
// import PrivateRouter from './components/bt5/PrivateRouter';
// import Account from './components/bt5/Account';


function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="product/:id" element={<ProductDetail />} />
      <Route path="student/:name" element={<Student />} />
      <Route path="student" element={<Student3 />} />
      <Route path="student4" element={<Student4 />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRouter />}>
        <Route path="account" element={<Account />} />
      </Route> */}
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/" element={<PrivateRouter user={user} />}>
        <Route path="account" element={<Account user={user} />} />
      </Route>

    </Routes>
  );
}

export default App;