import {
  FaCrown,
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaHeadset,
  FaUndo
} from 'react-icons/fa'; // Import the necessary icons

const icons = {
  'FaCrown': FaCrown,
  'FaShoppingCart': FaShoppingCart,
  'FaCreditCard': FaCreditCard,
  'FaTruck': FaTruck,
  'FaHeadset': FaHeadset,
  'FaUndo': FaUndo
};

function IconMap(icon) {
  return icons[icon] ? icons[icon] : undefined
}


export default IconMap;
