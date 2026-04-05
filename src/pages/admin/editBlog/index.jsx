import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const EditBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: 'Top 10 Fashion Trends 2024',
    category: 'Fashion',
    content: 'Fashion in 2024 is all about bold choices and sustainable options...',
    status: 'Published',
    thumbnail: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề';
    if (!formData.category.trim()) newErrors.category = 'Vui lòng chọn danh mục';
    if (!formData.content.trim()) newErrors.content = 'Vui lòng nhập nội dung';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    alert('Cập nhật bài viết thành công!');
    navigate('/admin/blog/list');
  };

  return (
    <AdminLayout title="Sửa bài viết">
      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sửa bài viết</h6>
              <button className="btn btn-sm btn-outline-light" onClick={() => navigate('/admin/blog/list')}>
                <i className="fa fa-arrow-left me-2"></i>Quay lại
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-light">Tiêu đề <span className="text-danger">*</span></label>
                <input type="text"
                  className={`form-control bg-dark border-0 text-light ${errors.title ? 'is-invalid' : ''}`}
                  name="title" value={formData.title} onChange={handleChange} />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Danh mục <span className="text-danger">*</span></label>
                <select className={`form-select bg-dark border-0 text-light ${errors.category ? 'is-invalid' : ''}`}
                  name="category" value={formData.category} onChange={handleChange}>
                  <option value="">-- Chọn danh mục --</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Style">Style</option>
                  <option value="Review">Review</option>
                  <option value="Accessories">Accessories</option>
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Nội dung <span className="text-danger">*</span></label>
                <textarea className={`form-control bg-dark border-0 text-light ${errors.content ? 'is-invalid' : ''}`}
                  name="content" rows={6} value={formData.content} onChange={handleChange} />
                {errors.content && <div className="invalid-feedback">{errors.content}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label text-light">Trạng thái</label>
                <select className="form-select bg-dark border-0 text-light"
                  name="status" value={formData.status} onChange={handleChange}>
                  <option value="Draft">Nháp</option>
                  <option value="Published">Đã đăng</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label text-light">Ảnh thumbnail</label>
                <input type="file" className="form-control bg-dark border-0 text-light"
                  accept="image/*" onChange={handleImageChange} />
                {preview && (
                  <div className="mt-3">
                    <img src={preview} alt="Preview" className="rounded"
                      style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary px-4">
                  <i className="fa fa-save me-2"></i>Cập nhật
                </button>
                <button type="button" className="btn btn-outline-secondary px-4"
                  onClick={() => navigate('/admin/blog/list')}>
                  <i className="fa fa-times me-2"></i>Hủy
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="bg-secondary rounded p-4">
            <h6 className="mb-3 text-primary"><i className="fa fa-info-circle me-2"></i>Gợi ý</h6>
            <ul className="text-light ps-3" style={{ fontSize: '0.9rem' }}>
              <li className="mb-2">Kiểm tra kỹ trước khi cập nhật.</li>
              <li className="mb-2">Đổi trạng thái thành <strong>Nháp</strong> để ẩn bài.</li>
              <li className="mb-2">Chỉ upload ảnh mới nếu muốn thay thumbnail.</li>
            </ul>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditBlog;