import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const ViewBlog = () => {
  const navigate = useNavigate();

  const blog = {
    id: 1,
    title: 'Top 10 Fashion Trends 2024',
    category: 'Fashion',
    author: 'Nguyen Van A',
    date: '2024-01-10',
    status: 'Published',
    views: 1234,
    comments: 45,
    thumbnail: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
    content: `Fashion in 2024 is all about bold choices and sustainable options. 
This year, we're seeing a massive shift towards eco-friendly materials and timeless pieces 
that can be worn across multiple seasons.

Các xu hướng nổi bật:
1. Oversized blazers kết hợp với slim-fit trousers
2. Monochromatic outfits trong tông màu đất
3. Phụ kiện nổi bật với trang phục tối giản
4. Phong cách denim lấy cảm hứng vintage
5. Bộ sưu tập vải tái chế thân thiện môi trường`,
  };

  return (
    <AdminLayout title="Xem bài viết">
      <div className="row g-4">
        <div className="col-12 col-xl-4">
          <div className="bg-secondary rounded p-4">
            <img src={blog.thumbnail} alt={blog.title} className="rounded w-100 mb-3"
              style={{ height: 200, objectFit: 'cover' }} />

            <div className="row g-3 text-center mb-3">
              <div className="col-6">
                <h5 className="text-primary mb-0">{blog.views.toLocaleString()}</h5>
                <small className="text-light">Lượt xem</small>
              </div>
              <div className="col-6">
                <h5 className="text-primary mb-0">{blog.comments}</h5>
                <small className="text-light">Bình luận</small>
              </div>
            </div>

            <hr className="border-secondary" />

            <div className="mb-2">
              <small className="text-light">Danh mục</small>
              <p className="mb-0 text-white">{blog.category}</p>
            </div>
            <div className="mb-2">
              <small className="text-light">Tác giả</small>
              <p className="mb-0 text-white">{blog.author}</p>
            </div>
            <div className="mb-2">
              <small className="text-light">Ngày đăng</small>
              <p className="mb-0 text-white">{blog.date}</p>
            </div>
            <div className="mb-3">
              <small className="text-light">Trạng thái</small>
              <p className="mb-0">
                <span className={`badge ${blog.status === 'Published' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {blog.status === 'Published' ? 'Đã đăng' : 'Nháp'}
                </span>
              </p>
            </div>

            <hr className="border-secondary" />
            <div className="d-flex gap-2">
              <button className="btn btn-warning btn-sm px-3" onClick={() => navigate(`/admin/blog/edit/${blog.id}`)}>
                <i className="fa fa-edit me-1"></i>Sửa
              </button>
              <button className="btn btn-outline-light btn-sm px-3" onClick={() => navigate('/admin/blog/list')}>
                <i className="fa fa-arrow-left me-1"></i>Quay lại
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8">
          <div className="bg-secondary rounded p-4">
            <h5 className="text-white mb-3">{blog.title}</h5>
            <hr className="border-secondary" />
            <div className="text-light" style={{ lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewBlog;