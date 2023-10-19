import Button from "../Button";
import { FaChevronDown } from 'react-icons/fa6'
import { useDispatch } from "react-redux";
import { showMoreProducts } from "../../store";
const ShowMore = () => {
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(showMoreProducts())
    }
    return (
        <Button
            onClick={handleClick}
            dark
            className={`flex flex-row justify-center items-center px-8`} >
            {
                <><p>Show More</p> <FaChevronDown /></>
            }
        </Button>
    );
};

export default ShowMore;
