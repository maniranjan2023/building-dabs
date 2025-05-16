import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, settoken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const endpoint =
        state === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload =
        state === 'Sign Up' ? { name, email, password } : { email, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        localStorage.setItem('token', data.token);
        settoken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="bg-white border-b border-gray-200 py-6 px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {state === 'Sign Up'
                ? 'Sign up to book your appointment'
                : 'Login to manage your appointments'}
            </p>
          </div>

          <div className="p-8">
            {state === 'Sign Up' && (
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
            )}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-4 rounded-md shadow transition duration-200"
            >
              {state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>

            <div className="mt-6 text-center text-sm text-gray-600">
              {state === 'Sign Up' ? (
                <p>
                  Already have an account?{' '}
                  <span
                    onClick={() => setState('Login')}
                    className="text-yellow-500 hover:underline font-medium cursor-pointer"
                  >
                    Login Here
                  </span>
                </p>
              ) : (
                <p>
                  Don’t have an account?{' '}
                  <span
                    onClick={() => setState('Sign Up')}
                    className="text-yellow-500 hover:underline font-medium cursor-pointer"
                  >
                    Create Account
                  </span>
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
