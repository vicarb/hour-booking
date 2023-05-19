import { useState } from 'react';
import { ChromePicker } from 'react-color';

export const TNavbar = ({ onLoginClick, onRegisterClick }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  return (
    <div className="px-5 py-3 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center">
        <Link href="/">
          <a className="text-3xl font-bold text-blue-500">MyApp</a>
        </Link>
        <button
          className="ml-4 w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none"
          style={{ backgroundColor: selectedColor }}
          onClick={toggleColorPicker}
        ></button>
        {isColorPickerOpen && (
          <div className="absolute top-12 left-0">
            <ChromePicker color={selectedColor} onChange={handleColorChange} />
          </div>
        )}
      </div>
      <div>
        <button
          className="px-3 py-1 mr-4 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={onRegisterClick}
        >
          Register
        </button>
        <button
          className="px-3 py-1 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={onLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};
