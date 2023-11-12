import React, { useState } from 'react';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { updateProductInfo } from '../../../store';

const ProductQuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleSub = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      dispatch(updateProductInfo({ quantity: newQuantity }));
    }
  };

  const handleAdd = () => {
    if (quantity < 9) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      dispatch(updateProductInfo({ quantity: newQuantity }));
    }
  };

  return (
    <div className='flex flex-row bg-base-100 rounded-lg p-2 items-center justify-center'>
      <h2 className="inline-block font-t-b me-2">Quantity : </h2>
      <button className='rounded-lg' onClick={handleSub}>
        <CiSquareMinus className='w-7 h-7 opacity-70 hover:opacity-100 transition' />
      </button>
      <h2 className='mx-2 font-t'>{quantity}</h2>
      <button onClick={handleAdd}>
        <CiSquarePlus className='w-7 h-7 opacity-70 hover:opacity-100 transition' />
      </button>
    </div>
  );
};

export default ProductQuantitySelector;
