import { useState } from 'react';
import { FaQuoteRight } from 'react-icons/fa';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import Panel from './Panel';
import StyleSpan from './StyleSpan';

import people from '../utils/testimonial';
import Button from './Button';

const Review = () => {
    const [index, setIndex] = useState(0);
    const { name, job, image, text } = people[index];

    const checkNumber = (number) => {
        if (number > people.length - 1) {
            return 0;
        } else if (number < 0) {
            return people.length - 1;
        }
        return number;
    };

    const nextPerson = () => {
        setIndex((index) => {
            let newIndex = index + 1;
            return checkNumber(newIndex);
        });
    };

    const prevPerson = () => {
        setIndex((index) => {
            let newIndex = index - 1;
            return checkNumber(newIndex);
        });
    };


    return (
        <Panel className='flex flex-col justify-start items-center h-screen mt-4'>
            {/* Flex Container */}
            <Panel className="flex md:flex-row flex-col justify-center items-center text-center">
                {/* Panel1 */}
                <Panel className="md:border-r-4 py-16 text-center mb-8 flex flex-col justify-center items-center">

                    <h1 className="text-4xl font-h w-96 mt-4">
                        Read these testimonials from our delighted <StyleSpan>customers!</StyleSpan>
                    </h1>
                    <Button dark className='btn rounded mt-10 px-12 font-h-b text-lg'>Share your review!</Button>
                </Panel>

                {/* Review Card */}
                <div className="card w-full bg-white mr-4">
                    {/* Review Content */}
                    <article className="flex flex-col justify-center items-center text-center bg-white p-6 rounded transition">
                        <div className="relative">
                            <img src={image} alt={name} className="person-img w-48 h-48 rounded-full object-cover mx-auto" />
                            <span className="quote-icon absolute top-0 left-[0%] w-10 h-10 flex items-center justify-center bg-pink-500 text-white rounded-full transform translate-y-1/4">
                                <FaQuoteRight />
                            </span>
                        </div>
                        <h4 className="text-2xl uppercase font-h-b mt-4">{name}</h4>
                        <p className="text-gray-500">{job}</p>
                        <p className="text-gray-500 text-xl w-96">{text}</p>
                        <div className="flex justify-around mt-4">
                            <Button dark className="btn-square me-4" onClick={prevPerson}>
                                <AiOutlineArrowLeft />
                            </Button>
                            <Button dark className="btn-square" onClick={nextPerson}>
                                <AiOutlineArrowRight />
                            </Button>
                        </div>
                    </article>
                </div>

            </Panel>
        </Panel>
    );
};

export default Review;
