import { useState } from 'react';
import NavbarColorPicker from '../NavbarColorPicker/NavbarColorPicker';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';

type NavbarProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  userLoggedIn: boolean; // New prop to indicate user login status
};

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onRegisterClick, userLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav className="relative flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-2xl tracking-tight">Your Website</span>
        {userLoggedIn && (
          <span className="ml-4">{`Hello, ${user?.username}`}</span> // Show username here
        )}
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => setOpen(!open)}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        onClick={() => setOpen(false)}
        className={`fixed top-0 right-0 h-full w-full max-w-full overflow-y-auto bg-blue-500 transform transition-transform duration-200 lg:relative lg:translate-x-0 lg:bg-transparent ${
          open ? 'translate-x-0' : 'translate-x-full'
        } lg:w-auto lg:flex`}
      >
        <div className="text-sm lg:flex-grow px-6 py-4">
          {/* Add your other navigation links here */}
          <Link href="/">
            <span className="text-lg px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-150 mt-4 lg:mt-0 font-bold">
              Home
            </span>
          </Link>
          <NavbarColorPicker />
          {userLoggedIn && (
            <Link href="/profile">
              <span className="text-lg px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-150 mt-4 lg:mt-0 font-bold">
                Profile
              </span>
            </Link>
          )}
        </div>
        <div className="px-6 py-4">
          {!userLoggedIn && (
            <>
              <button
                className="inline-block text-lg px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-150 mt-4 lg:mt-0 font-bold"
                onClick={onLoginClick}
              >
                Login
              </button>
              <button
                className="inline-block text-lg px-4 py-2 leading-none border rounded text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-150 mt-4 lg:mt-0 ml-2 font-bold"
                onClick={onRegisterClick}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
