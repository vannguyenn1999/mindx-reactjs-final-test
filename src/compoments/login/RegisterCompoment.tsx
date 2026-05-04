import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';


const RegisterCompoment = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(''); 
  const [loding, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const registerSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu là bắt buộc'),

    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), 'Mật khẩu xác nhận không khớp'], 'Mật khẩu xác nhận không khớp')
      .required('Xác nhận mật khẩu là bắt buộc'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
     try {
        setLoading(true);
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BE_API_URL_DEV}auth/register`,
          values
        );
        setStatus('');
        toast.success('Đăng ký thành công!');
        setLoading(false);
        navigate('/login');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 400) {
            setStatus(error.response.data?.message || 'Unauthorized');
          } else {
            setStatus(error.response?.data?.detail || 'Lỗi khác xảy ra');
          }
        } else {
          console.log(error);
          setStatus('Lỗi không xác định');
        }
        setLoading(false);
        toast.error('Đăng ký thất bại!');
      }
    },
  });
  return(
    <>
      <form className="px-4 mt-3 p-5" onSubmit={formik.handleSubmit}>
        {
          status !== '' && (
            <Alert color="failure" className='mb-5 flex items-center justify-center'>
              <span className="font-medium">{status}</span>
            </Alert>
        )}
        
        <div>
          <label className="block font-bold mb-2" htmlFor="username">Email</label>
          <input
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="email"
            placeholder="Mời bạn nhập email"
            {...formik.getFieldProps('email')}
          />

          {formik.touched.email && formik.errors.email ? (
              <div className='mt-1' style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
        </div>
        <div className="my-5 relative">
          <label className="block font-bold mb-2" htmlFor="password">Password</label>
          <input
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Mời bạn nhập mật khẩu"
            {...formik.getFieldProps('password')}

          />
          <div className="absolute top-13 right-3 transform -translate-y-1/2 cursor-pointer">
              { showPassword ? <FaEyeSlash  onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} /> }
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className='mt-1' style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="my-5">
          <label className="block font-bold mb-2" htmlFor="passwordConfirm">Xác nhận Password</label>
          <input
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="passwordConfirm"
            placeholder="Mời bạn xác nhận mật khẩu"
            {...formik.getFieldProps('passwordConfirm')}

          />

            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <div className='mt-1' style={{ color: 'red' }}>{formik.errors.passwordConfirm}</div>
            ) : null}
        </div>
        <Button disabled={loding} color="green" size='lg' type='submit' className="w-full p-3 bg-green-700 rounded-lg mb-3 font-medium text-white cursor-pointer hover:bg-green-600 transition-colors">
          {loding ? (
            <>
          <Spinner size="sm" aria-label="Đang đăng ký" className="me-3" light />
          Đang đăng ký ...</>) : 'Đăng ký'}
        </Button>
        <div className="mb-3 flex items-center justify-between">
          {/* <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a> */}
          <Link to="/login" className="text-blue-500 hover:underline ms-3">Bạn đã có tài khoản ?</Link>
        </div>
      </form>
    </>
      
    
  )
};
export default RegisterCompoment;
