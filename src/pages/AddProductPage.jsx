import Button from "../components/Button";
import Panel from "../components/Panel";
import StyleSpan from "../components/StyleSpan";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { BsChevronLeft, BsChevronDown, BsGenderMale, BsGenderFemale, BsGenderAmbiguous } from 'react-icons/bs'
import Category from "../components/AddProducts/components/Category";
import Sizes from "../components/AddProducts/components/Sizes";

const validCombinations = {
    Electronics: ['Smartphones', 'Laptops', 'Headphones', 'Cameras', 'Wearable Tech', 'Other'],
    Fashion: ['Apparel', 'Bags', 'Watches', 'Glasses', 'Top', 'Bottom', 'Outerwear', 'Footwear', 'Other'],
    'Home & Living': ['Furniture', 'Home Decor', 'Kitchenware', 'Bedding', 'Lighting', 'Other'],
    'Beauty & Health': ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Wellness Products', 'Other'],
    'Books & Stationery': ['Novels', 'Notebooks', 'Pens', 'Academic Books', 'Art Supplies', 'Other'],
    Other: ['Other']
};

export default function AddProductPage() {


    const genders = ['Male', "Female", "Unisex"];
    const categories = Object.keys(validCombinations)

    const [selectedGender, setGender] = useState('')
    const [selectCategory, setSelectCategory] = useState(null)
    const [selectSubCategory, setSelectSubCategory] = useState(null)


    const subCategories = selectCategory ? validCombinations[selectCategory] : null;


    const [inputFields, setInputFields] = useState([{ value: '' }]);

    const isAddButtonVisible = inputFields.every((field) => field.value.trim() !== '');

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }
    const changeGender = (gender) => {
        setGender(gender);
    }

    const handleUpdateCategory = (value) => {
        setSelectSubCategory(null)
        setSelectCategory(value)
    }

    const handleUpdateSubCategory = (value) => {
        setSelectSubCategory(value)
    }

    const handleAddField = () => {
        setInputFields([...inputFields, { value: '' }]);
    };


    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);

        // Remove the current field if it's empty and there is more than one field
        if (event.target.value === '' && inputFields.length > 1) {
            values.splice(index, 1);
            setInputFields(values);
        }
    };

    const handleRemoveField = (index) => {
        if (inputFields.length > 1) {
            const values = [...inputFields];
            values.splice(index, 1);
            setInputFields(values);
        }
    };


    return (
        <>
            <div role="alert" className="alert alert-warning my-14 w-full flex items-center justify-center bg-red-100 border-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current stroke-red-700 shrink-0 h-12 w-12" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span className="text-red-700 font-h-b text-3xl">This section is under development!</span>
            </div>
            <Panel className="flex flex-col bg-base-100 items-center justify-center my-10">
                <h1 className="font-h-b text-3xl">Add product to be <StyleSpan>listed</StyleSpan></h1>
                <Panel className="bg-white rounded-lg flex flex-col p-5 mt-4 items-start justify-center lg:w-[55vw]">
                    <form className="w-full bg-white">
                        {/* Name */}
                        <h1 className="text-xl font-h-b px-2 py-1">
                            Enter Product Name
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                        </h1>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-lg" />
                        {/* SP */}
                        <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                            Enter Selling Price
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                        </h1>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-lg" />
                        {/* Discount Percentage */}
                        <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                            Enter Discount %
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                            <span className="text-xs ms-2">( Between 0 and 99 )</span>

                        </h1>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-lg" />
                        {/* Brand */}
                        <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                            Enter Product Barnd
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                        </h1>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-lg" />
                        {/* Quantity */}
                        <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                            Enter Product Quantity
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                        </h1>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-lg" />

                        {/* Main Image */}
                        <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                            Products Catalogue Image URL
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                        </h1>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full rounded-lg" />
                        {/* Carousel Images */}
                        <div className="flex flex-col">
                            <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                                Product Information Page Images URLs
                                <span className="text-red-500 ms-1 text-sm">
                                    *
                                </span>
                                <span className="text-xs ms-2">(Atleast one required!)</span>
                            </h1>
                            {inputFields.map((field, index) => (
                                <div className="flex flex-row justify-between" key={index}>
                                    <input
                                        type="text"
                                        placeholder="Type here"
                                        value={field.value}
                                        className="input input-bordered w-[95%] rounded-lg my-1"
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                    {
                                        inputFields.length > 1 &&
                                        (
                                            <button className="" type="button" onClick={() => handleRemoveField(index)}>
                                                <CiCircleRemove className="ms-1 text-3xl" />
                                            </button>
                                        )
                                    }
                                </div>
                            ))}
                            {isAddButtonVisible && inputFields.length < 10 && (
                                <Button dark={true} className="ms-auto me-8 mt-3" type="button" onClick={handleAddField}>
                                    Add More!
                                </Button>
                            )}
                        </div>
                        {/* Desc */}
                        <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                            Product description
                            <span className="text-red-500 ms-1 text-sm">
                                *
                            </span>
                        </h1>
                        <textarea type="text" placeholder="Type here" className="textarea textarea-bordered w-full rounded-lg" />
                        {/* Gender */}
                        <div>
                            <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                                Which Gender is this product aimed for ?
                                <span className="text-red-500 ms-1 text-sm">
                                    *
                                </span>
                            </h1>

                            {genders.map((gender, index) => (
                                <div key={index} className="gender-container px-2 py-1 flex flex-row items-center">
                                    <input
                                        type="radio"
                                        name="radio-select-gender"
                                        className="radio radio-secondary mr-2"
                                        value={gender}              // Set the value to the category name
                                        onChange={handleGenderChange}  // Handle the change event
                                        checked={selectedGender === gender}  // Check if this category is the selected one
                                    />
                                    <button className="text-start flex flex-row items-center"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            changeGender(gender)
                                        }}>
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
                        {/* Categories */}
                        <div>
                            <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                                Select Product Category and Sub-Category
                                <span className="text-red-500 ms-1 text-sm">
                                    *
                                </span>
                            </h1>
                            <Category
                                selectCat={selectCategory}
                                selectSubCat={selectSubCategory}
                                categories={categories}
                                subCategories={subCategories}
                                updateCat={handleUpdateCategory}
                                updateSubCat={handleUpdateSubCategory}
                            />
                        </div>
                        {
                            selectCategory === 'Fashion' && (
                                <div>
                                    <h1 className="text-xl font-h-b px-2 py-1 mt-2">
                                        Select availavle product size
                                        <span className="text-red-500 ms-1 text-sm">
                                            *
                                        </span>
                                        <span className="text-xs ms-2">(For fashion category!)</span>

                                    </h1>
                                    <Sizes />
                                </div>
                            )
                        }

                    </form>
                </Panel>
                <div role="alert" className="alert alert-error m-10 bg-red-100 flex items-center justify-center px-10 lg:w-[55vw]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-700 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>
                        <p className="inline text-red-700 text-md font-t-b mr-2">
                            Note:
                        </p>
                        <p className="inline text-red-500 underline">
                            Your products will only be visible in products catalogue after they have been approved by the admin!
                        </p>
                    </span>
                </div>
            </Panel >
        </>
    )
}