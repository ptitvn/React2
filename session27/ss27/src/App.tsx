import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './components/bt1/Home';
import About from './components/bt1/About';
import Contact from './components/bt1/Contact';
import Navbar from './components/bt1/Navbar';
import ProductList from './components/bt2/ProductList';
import ProductDetail from './components/bt2/ProductDetail';
import TaskList from './components/bt3/TaskList';
import TaskDetail from './components/bt3/TaskDetail';
import ProductList2 from './components/bt4/ProductList4';

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="products" element={<ProductList />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="tasks" element={<TaskList />} />
      <Route path="task/:id" element={<TaskDetail />} />

      <Route path="product" element={<ProductList2 />} />

    </Routes>


  );
}

export default App;