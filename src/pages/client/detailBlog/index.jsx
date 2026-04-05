/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaQuoteLeft } from 'react-icons/fa';
import requestAPI from '../../../RequestAPI';
import './style.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await requestAPI({ method: 'GET', url: `/blogs/${id}` });
        if (response && response.data) {
          setBlog(response.data.data);
        } else {
          setError('Không tìm thấy blog');
        }
      } catch (err) {
        setError('Lỗi khi tải blog');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!blog) return <div>Blog không tồn tại</div>;

  return (
    <div className='blog-details-wrapper'>
      {/* Blog Details Hero - Phần tiêu đề bài viết */}
      <section className='blog-hero'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={9} className='text-center'>
              <div className='blog__hero__text'>
                <h2>
                  {blog.title}
                </h2>
                <ul className='list-inline'>
                  <li className='list-inline-item'>Bởi {blog.author || 'Unknown'}</li>
                  <li className='list-inline-item'>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</li>
                  <li className='list-inline-item'>8 Bình luận</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Blog Details Content Section */}
      <section className='blog-details spad'>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={12} className='mb-5'>
              <div className='blog__details__pic text-center'>
                <img
                  src={blog.image || 'https://i.pinimg.com/736x/ca/19/05/ca19054b7037d53e316afb08b45b5440.jpg'}
                  alt='Blog Main'
                  className='img-fluid'
                />
              </div>
            </Col>

            <Col lg={8}>
              <div className='blog__details__content'>
                {/* Chia sẻ mạng xã hội bên trái (Sticky desktop) */}
                <div className='blog__details__share'>
                  <span>Chia sẻ</span>
                  <ul>
                    <li>
                      <a href='#' className='facebook'>
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='twitter'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='youtube'>
                        <FaYoutube />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='linkedin'>
                        <FaLinkedinIn />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='blog__details__text'>
                  <div dangerouslySetInnerHTML={{ __html: blog.content || 'Nội dung không có.' }} />
                </div>

                {/* Phần trích dẫn */}
                <div className='blog__details__quote'>
                  <FaQuoteLeft className='quote-icon' />
                  <p>
                    {blog.quote || '“Khi thiết kế quảng cáo cho một sản phẩm cụ thể, nhiều thứ cần được nghiên cứu kỹ lưỡng như nơi nó nên được hiển thị.”'}
                  </p>
                  <h6>{blog.quoteAuthor || '_ John Smith _'}</h6>
                </div>

                {/* Tags và Tác giả */}
                <div className='blog__details__option'>
                  <Row>
                    <Col sm={6}>
                      <div className='blog__details__author d-flex align-items-center'>
                        <div className='blog__details__author__pic'>
                          <img
                            src={blog.authorImage || 'https://i.pinimg.com/736x/70/09/21/7009214dd03308c20f6cf142b93886b6.jpg'}
                            alt='Author'
                            className='rounded-circle'
                          />
                        </div>
                        <div className='blog__details__author__text ms-3'>
                          <h5>{blog.author || 'Aiden Blair'}</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm={6} className='text-sm-end text-start mt-3 mt-sm-0'>
                      <div className='blog__details__tags'>
                        {blog.tags ? blog.tags.split(',').map((tag, index) => (
                          <a key={index} href='#'>#{tag.trim()}</a>
                        )) : (
                          <>
                            <a href='#'>#Thờitrang</a> <a href='#'>#Xuhướng</a> <a href='#'>#2020</a>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Điều hướng bài viết */}
                <div className='blog__details__btns border-top border-bottom py-4 my-4'>
                  <Row>
                    <Col xs={6}>
                      <a href='#' className='blog__details__btns__item text-decoration-none'>
                        <p className='mb-1 text-muted'>← Bài trước</p>
                        <h6 className='text-dark'>
                          Cách sử dụng các trang quảng cáo miễn phí hiệu quả
                        </h6>
                      </a>
                    </Col>
                    <Col xs={6} className='text-end border-start'>
                      <a href='#' className='blog__details__btns__item text-decoration-none'>
                        <p className='mb-1 text-muted'>Bài kế tiếp →</p>
                        <h6 className='text-dark'>
                          Mẹo chọn loại son bóng hoàn hảo cho đôi môi của bạn
                        </h6>
                      </a>
                    </Col>
                  </Row>
                </div>

                {/* Form bình luận */}
                <div className='blog__details__comment'>
                  <h4 className='mb-4'>Để lại bình luận</h4>
                  <Form>
                    <Row className='g-3'>
                      <Col md={4}>
                        <Form.Control
                          type='text'
                          placeholder='Họ tên'
                          className='custom-input'
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          type='email'
                          placeholder='Email'
                          className='custom-input'
                        />
                      </Col>
                      <Col md={4}>
                        <Form.Control
                          type='text'
                          placeholder='Số điện thoại'
                          className='custom-input'
                        />
                      </Col>
                      <Col xs={12}>
                        <Form.Control
                          as='textarea'
                          rows={4}
                          placeholder='Bình luận của bạn'
                          className='custom-input'
                        />
                      </Col>
                      <Col xs={12} className='text-center mt-4'>
                        <Button variant='dark' type='submit' className='site-btn px-5 py-3'>
                          Gửi bình luận
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default BlogDetails;
