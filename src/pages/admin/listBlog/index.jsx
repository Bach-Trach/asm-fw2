import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const ListBlog = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Top 10 Fashion Trends 2024', category: 'Fashion', author: 'Nguyen Van A', date: '2024-01-10', status: 'Published' },
    { id: 2, title: 'How to Style Your Outfit', category: 'Style', author: 'Tran Thi B', date: '2024-01-15', status: 'Published' },
    { id: 3, title: 'Winter Collection Review', category: 'Review', author: 'Le Van C', date: '2024-01-20', status: 'Draft' },
    { id: 4, title: 'Best Accessories of the Year', category: 'Accessories', author: 'Pham Thi D', date: '2024-01-25', status: 'Published' },
    { id: 5, title: 'Summer Lookbook 2024', category: 'Fashion', author: 'Hoang Van E', date: '2024-02-01', status: 'Draft' },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = blogs.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setBlogs(blogs.filter((b) => b.id !== id));
    }
  };

  return (
    <AdminLayout title="Danh sách bài viết">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Tất cả bài viết</h6>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/blog/add')}>
                <i className="fa fa-plus me-2"></i>Thêm bài viết
              </button>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control bg-dark border-0 text-light"
                  placeholder="Tìm kiếm tiêu đề..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <select
                  className="form-select bg-dark border-0 text-light"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">Tất cả</option>
                  <option value="Published">Đã đăng</option>
                  <option value="Draft">Nháp</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th>#</th>
                    <th>Tiêu đề</th>
                    <th>Danh mục</th>
                    <th>Tác giả</th>
                    <th>Ngày đăng</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((blog, i) => (
                      <tr key={blog.id}>
                        <td>{i + 1}</td>
                        <td>{blog.title}</td>
                        <td>{blog.category}</td>
                        <td>{blog.author}</td>
                        <td>{blog.date}</td>
                        <td>
                          <span className={`badge ${blog.status === 'Published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {blog.status === 'Published' ? 'Đã đăng' : 'Nháp'}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/admin/blog/view/${blog.id}`)}>
                            <i className="fa fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(blog.id)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" className="text-center">Không tìm thấy bài viết</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-light">Hiển thị {filtered.length} / {blogs.length} bài viết</small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled"><a className="page-link bg-secondary border-0" href="#">Trước</a></li>
                  <li className="page-item active"><a className="page-link bg-primary border-0" href="#">1</a></li>
                  <li className="page-item"><a className="page-link bg-secondary border-0" href="#">Sau</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListBlog;