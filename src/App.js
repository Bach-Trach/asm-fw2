import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin pages
import Dashboard from './pages/admin/dashboard';
import ListCategory from './pages/admin/listCategory';
import AddCategory from './pages/admin/addCategory';
import ListUser from './pages/admin/listUser';
import ViewUser from './pages/admin/viewUser';
import ListBlog from './pages/admin/listBlog';
import AddBlog from './pages/admin/addBlog';
import ViewBlog from './pages/admin/viewBlog';
import EditBlog from './pages/admin/editBlog';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect / về dashboard */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/category/list" element={<ListCategory />} />
        <Route path="/admin/category/add" element={<AddCategory />} />
        <Route path="/admin/user/list" element={<ListUser />} />
        <Route path="/admin/user/view/:id" element={<ViewUser />} />

        {/* Blog routes */}
        <Route path="/admin/blog/list" element={<ListBlog />} />
        <Route path="/admin/blog/add" element={<AddBlog />} />
        <Route path="/admin/blog/view/:id" element={<ViewBlog />} />
        <Route path="/admin/blog/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;