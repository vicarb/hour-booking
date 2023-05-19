import Link from 'next/link';

const Navbar = ({ onLoginClick }) => (
  <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <span className="font-semibold text-2xl tracking-tight">Your Website</span>
    </div>
    <div className="block lg:hidden">
      <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
        </svg>
      </button>
    </div>
    <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-sm lg:flex-grow">
        {/* Add your other navigation links here */}
      </div>
      <div>
      <Link href="/login">
      <span 
        className="inline-block text-lg px-4 py-2 leading-none border rounded text-white bg-indigo-500 hover:bg-indigo-600 transition-colors duration-150 mt-4 lg:mt-0 font-bold" 
        onClick={(e) => { e.preventDefault(); onLoginClick(); }}
      >
        Login
      </span>
    </Link>
        <Link href="/register">
          <span className="inline-block text-lg px-4 py-2 leading-none border rounded text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-150 mt-4 lg:mt-0 ml-2 font-bold">
            Register
          </span>
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
