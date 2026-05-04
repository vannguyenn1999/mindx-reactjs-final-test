import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Alert, Button, Spinner } from 'flowbite-react';
import axios from 'axios';

import { useAuth } from '../../core/AuthContext';

const LoginCompoment = () => {
  const navigation = useNavigate();
  const { saveAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loding, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const loginSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema, // Kết nối Yup ở đây
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BE_API_URL_DEV}auth/login`,
          values
        );
        console.log('response :', response);
        saveAuth(response.data);
        if (response.status === 200) {
          toast.success('Đăng nhập thành công!');
          navigation('/home');
        } else {
          toast.error('Đăng nhập thất bại!');
        }
        setStatus('');
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(' error.response.data : ', error.response?.data);
          if (error.response?.status === 401) {
            setStatus(error.response.data?.message || 'Unauthorized');
          } else {
            setStatus(error.response?.data?.detail || 'Lỗi khác xảy ra');
          }
        } else {
          console.log(error);
          setStatus('Lỗi không xác định');
        }
        setLoading(false);
        toast.error('Đăng nhập thất bại!');
      }
    },
  });
  return (
    <>
      <form className="px-4 mt-3 p-5" onSubmit={formik.handleSubmit}>
        {status !== '' && (
          <Alert
            color="failure"
            className="mb-5 flex items-center justify-center"
          >
            <span className="font-medium">{status}</span>
          </Alert>
        )}
        <div>
          <label className="block font-bold mb-2" htmlFor="username">
            Email
          </label>
          <input
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="email"
            placeholder="Mời bạn nhập email"
            {...formik.getFieldProps('email')}
          />

          {formik.touched.email && formik.errors.email ? (
            <div className="mt-1" style={{ color: 'red' }}>
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="my-5 relative">
          <label className="block font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Mời bạn nhập mật khẩu"
            {...formik.getFieldProps('password')}
          />
          <div className="absolute top-13 right-3 transform -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <FaEyeSlash onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye onClick={() => setShowPassword(true)} />
            )}
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="mt-1" style={{ color: 'red' }}>
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <Button
          disabled={loding}
          color="green"
          size="lg"
          type="submit"
          className="w-full p-3 bg-green-700 rounded-lg mb-3 font-medium text-white cursor-pointer hover:bg-green-600 transition-colors"
        >
          {loding ? (
            <>
              <Spinner
                size="sm"
                aria-label="Đang đăng nhập"
                className="me-3"
                light
              />
              Đang đăng nhập ...
            </>
          ) : (
            'Đăng nhập'
          )}
        </Button>

        <div className="mb-3 flex items-center justify-between">
          <a href="#" className="text-blue-500 hover:underline">
            Quên mật khẩu?
          </a>
          <Link to="/register" className="text-blue-500 hover:underline ms-3">
            Bạn chưa có tài khoản ?
          </Link>
        </div>
      </form>
    </>
  );
};
export default LoginCompoment;
