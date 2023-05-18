'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser} = useUser()
  useEffect(() => {
    console.log("user from effect", user);
    if (user === username) {
      onLoginSuccess();
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(username)
    console.log("user context",user);


    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      
      
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      setUser(username);


    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
  <Dialog
    as="div"
    className="fixed inset-0 z-10 overflow-y-auto"
    onClose={onClose}
  >
    <div className="flex items-center justify-center min-h-screen px-4 text-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <span
        className="inline-block h-screen align-middle"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl flex flex-col items-center space-y-6">
        <Dialog.Title
          as="h2"
          className="text-4xl leading-6 font-bold text-gray-900 mb-4"
        >
          Login to your account
        </Dialog.Title>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="text-2xl font-bold text-gray-700 mb-1">Username</label>
              <input 
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 text-lg border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-2xl font-bold text-gray-700 mb-1">Password</label>
              <input 
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 text-lg border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-bold text-2xl rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
</Transition>


  )

}
    
export default LoginModal