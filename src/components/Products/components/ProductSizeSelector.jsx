import React, { useState } from 'react';
import mapSize from '../../../utils/mapSize';
import { useDispatch } from 'react-redux';
import { updateProductInfo } from '../../../store';

const ProductSizeSelector = ({ product, resetSizeError }) => {
  // Initialize the selectedSize state as an empty string
  const [selectedSize, setSelectedSize] = useState('');
  const dispatch = useDispatch()

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
    resetSizeError(false)
    dispatch(updateProductInfo({ size: newSize }));
  };


  return (
    <select
      className="select select-bordered w-full max-w-xs mt-4 mb-4 text-md text-center font-h-b text-xl"
      value={selectedSize} // Set the value to the selectedSize state
      onChange={handleSizeChange} // Update the state when the user selects a different option
    >
      {/* This option is visible by default, but once the user selects a different option, they cannot select this again */}
      <option className='font-h text-xl' value="" disabled>
        Select Your Size
      </option>
      {product?.sizes.map(size => (
        <option className='font-h text-xl' key={`${product?._id}_${size}`} value={size}>
          {mapSize(size)}
        </option>
      ))}
    </select>
  );
};

export default ProductSizeSelector;
