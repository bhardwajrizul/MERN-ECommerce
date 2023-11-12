import { useState, useRef, useEffect } from "react";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function ProductCarousel({ images }) {
    const previewContainerRef = useRef();
    const [imageIndex, setImageIndex] = useState(0)

    // This useEffect will run when 'imageIndex' or 'images' changes
    useEffect(() => {
        // Set up a timeout to automatically cycle to the next image
        const timer = setTimeout(() => {
            setImageIndex((index) => {
                scrollToPreview(index)
                return index === images.length - 1 ? 0 : index + 1;
            });
        }, 3000); // Change image every 3 seconds

        // Clear the timer if the component is unmounted or imageIndex changes
        return () => clearTimeout(timer);
    }, [imageIndex, images]);

    const showPrevImage = () => {
        setImageIndex((index) => {
            const newIndex = index === 0 ? images.length - 1 : index - 1;
            scrollToPreview(newIndex);
            return newIndex;
        });
    };

    const showNextImage = () => {
        setImageIndex((index) => {
            const newIndex = index === images.length - 1 ? 0 : index + 1;
            scrollToPreview(newIndex);
            return newIndex;
        });
    };


    const scrollToPreview = (index) => {
        const previewContainer = previewContainerRef.current;
        if (previewContainer) {
            const previewImages = Array.from(previewContainer.children);
            const targetImage = previewImages[index];
            if (targetImage) {
                const scrollAmount = targetImage.offsetLeft + targetImage.clientWidth / 2 - previewContainer.offsetWidth / 2;
                previewContainer.scroll({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }
    };


    const renderedImages = images.map((image, index) => {
        return (
            <img
                key={`${image}_${index}`}
                src={image}
                style={{ transform: `translateX(-${100 * imageIndex}%)` }}
                className={`grow-0 shrink-0 transition-transform object-cover w-full h-full block`}
            />
        )
    })

    const previewImages = images.map((image, index) => {
        return (
            <img
                key={`${image}_${index}_preview`}
                src={image}
                onClick={() => {
                    setImageIndex(index);
                    scrollToPreview(index);
                }}

                className={`mx-2 rounded-lg transition-transform object-cover hover:cursor-pointer w-20 h-20 block ${index === imageIndex && 'opacity-50'}`}
            />
        )
    })

    return (
        <>

            <div className={`w-full h-full relative rounded-lg overflow-hidden`}>
                <div className={`w-full h-full rounded-lg flex`}>
                    {renderedImages}
                </div>
                {/* <img className="object-cover w-full h-full block" src={images[imageIndex]} /> */}
                <button onClick={showPrevImage} className="block absolute top-0 bottom-0 left-0 p-4 bg-black opacity-10 hover:opacity-100 transition-opacity">
                    <AiOutlineArrowLeft className="text-2xl stroke-white fill-white" />
                </button>
                <button onClick={showNextImage} className="block absolute top-0 bottom-0 right-0 p-4 bg-black opacity-10 hover:opacity-100 transition-opacity">
                    <AiOutlineArrowRight className="text-2xl stroke-white fill-white" />
                </button>
            </div>
            <div
                ref={previewContainerRef}
                className="flex items-center justify-start rounded-lg w-full h-21 mt-2 overflow-x-scroll">
                {previewImages}
            </div>
        </>
    )
}

export default ProductCarousel


