import { useState } from "react"

export default function Sizes() {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    const [selections, setSelections] = useState([])

    const updateSize = (size) => {
        if (selections.includes(size)) {
            // If size is already selected, remove it
            const updatedSelections = selections.filter((selectedSize) => selectedSize !== size);
            setSelections(updatedSelections);
        } else {
            // If size is not selected, add it
            setSelections([...selections, size]);
        }
    };


    return (
        <>
            {sizes.map((size, index) => (
                <div key={index} className="category-item px-2 py-1 flex flex-row items-center">
                    <input
                        id={size}
                        type="checkbox"
                        className="checkbox checkbox-secondary mr-2 rounded-lg"
                        value={size}
                        onChange={() => updateSize(size)}
                        checked={selections?.includes(size)}
                    />
                    <label htmlFor={size} className="text-start">{size}</label> {/* Label added to improve UX */}
                </div>
            ))}
        </>
    )
}