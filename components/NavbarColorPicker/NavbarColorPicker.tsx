import { useState } from 'react';
import { ChromePicker } from 'react-color';

const NavbarColorPicker = () => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#008811');

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    document.querySelector('nav').style.backgroundColor = color.hex;
  };

  return (
    <div className="relative inline-flex">
      <button
        className="ml-4 w-8 h-8 rounded-full border border-gray-300 bg-white hover:bg-gray-100 focus:outline-none"
        style={{ backgroundColor: selectedColor }}
        onClick={toggleColorPicker}
      ></button>
      {isColorPickerOpen && (
        <div className="absolute top-12 left-0 z-10">
          <ChromePicker color={selectedColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default NavbarColorPicker;
