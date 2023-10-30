import Button from "../../Button";
import { useState } from "react";
import { BsChevronLeft, BsChevronDown, BsGenderMale, BsGenderFemale, BsGenderAmbiguous } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux";
import { resetGender, setGender } from "../../../store";

function GenderFilter() {
    const [open, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const { selectedGender, filterApplied } = useSelector((state) => {
        return {
            selectedGender: state.filters.gender,
            filterApplied: state.filters.countFiltersApplied.gender
        }
    })
    const genders = ['Male', "Female", "Unisex"];

    const handleGenderChange = (e) => {
        dispatch(setGender(e.target.value));
    }
    const changeGender = (discount) => {
        dispatch(setGender(discount));
    }

    const handleResetGender = () => dispatch(resetGender())

    return (
        <details className="collapse bg-white border flex flex-col ">
            <summary onClick={() => setIsOpen((prev) => !prev)} className="collapse-title px-2">
                <div className="flex flex-row text-2xl font-h-b items-center justify-between">
                    <div className={`text-2xl ${filterApplied ? 'font-h-b' : 'font-h'}`}>
                        Gender
                    </div>
                    {open ? <BsChevronDown className="text-sm text-bold" /> : <BsChevronLeft className="text-sm text-bold" />}
                </div>
            </summary>
            <div className="collapse-content">
                {open && genders.map((gender, index) => (
                    <div key={index} className="gender-container px-2 py-1 flex flex-row items-center">
                        <input
                            type="radio"
                            name="radio-3"
                            className="radio radio-secondary mr-2"
                            value={gender}              // Set the value to the category name
                            onChange={handleGenderChange}  // Handle the change event
                            checked={selectedGender === gender}  // Check if this category is the selected one
                        />
                        <button className="text-start flex flex-row items-center" onClick={() => changeGender(gender)}>
                            <div className="mr-2">
                                {gender}
                            </div>
                            {gender === 'Male' && <BsGenderMale className="font-bold text-xl" />}
                            {gender === 'Female' && <BsGenderFemale className="font-bold text-xl" />}
                            {gender === 'Unisex' && <BsGenderAmbiguous className="font-bold text-xl" />}

                        </button>
                    </div>
                ))}
            </div>
            {
                filterApplied &&
                <Button dark className='ml-auto mr-4 mb-3' onClick={handleResetGender}>
                    Clear
                </Button>
            }
        </details>
    )
}

export default GenderFilter;
