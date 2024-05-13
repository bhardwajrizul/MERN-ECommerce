import React, { useEffect, useState } from "react";
import Panel from "./Panel";
import { ImCross } from 'react-icons/im'
import CopyToClipboard from "./Copy";
import StyleSpan from "./StyleSpan";

export default function UserGuide() {
    const [guideVisible, setGuideVisible] = useState(true);

    const toggleGuide = () => {
        setGuideVisible(!guideVisible);
    };

    // Shows guide for 1 sec on initial page load
    // Commented because guide should stay open until user closes it manually ?
    // useEffect(() => {
    //     const timer = setTimeout(() => setGuideVisible(false), 1000)
    //     return () => clearTimeout(timer);
    // }, [])

    return (
        <>
            <div className="relative">
                <div className="z-50 inline-block fixed bottom-1 right-5">
                    <button className="bg-white rounded-full outline p-0 hover:pointer hover:opacity-70" onClick={toggleGuide}>
                        <svg className="fill-black stroke-white p-1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32" id="info"><path d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm-2 14a2 2 0 0 1 4 0v10a2 2 0 0 1-4 0V14zm2-3.968a2 2 0 1 1 .001-4.001A2 2 0 0 1 16 10.032z"></path></svg>
                    </button>
                </div>

                <div
                    className={`fixed right-5 bottom-14 mb-1 z-30 rounded-lg transition-all bg-white overflow-y-scroll  ${!guideVisible ? 'h-[0px] w-[0px] w-[0vw] h-0 w-0 lg:w-0 border-none' : 'lg:w-96 w-[90vw] h-[70%] border-double  border-4'}`}
                >
                    <div className="p-0 relative flex flex-col items-center justify-center">
                        <div className="sticky top-0 w-full">
                            <button className="absolute right-0 top-0" onClick={() => setGuideVisible(false)}>
                                <ImCross className="m-2" />
                            </button>
                        </div>
                        <h1 className="text-lg sm:text-lg font-h-b mt-2 my-1 ml-2 text-center inline-block">
                            User Guide!
                        </h1>
                        <div className="stats stats-vertical shadow w-full bg-white">

                            <div className="stat">
                                <p className="font-t text-gray-500">Use these test cards or test UPI at payment gateway for testing. </p>
                                <div className="font-t text-sm flex flex-col">
                                    <div>
                                        <h1 className="text-sm font-h-b text-gray-600">
                                            UPI (for Success)
                                        </h1>
                                        <CopyToClipboard textToCopy='success@razorpay'>
                                            success@razorpay
                                        </CopyToClipboard>
                                        <h1 className="text-sm font-h-b text-gray-600">
                                            UPI (for Failure)
                                        </h1>
                                        <CopyToClipboard textToCopy='failure@razorpay'>
                                            failure@razorpay
                                        </CopyToClipboard>
                                        <h1 className="text-sm font-h-b text-gray-600">
                                            Card (Visa)
                                        </h1>

                                        <CopyToClipboard textToCopy="4111 1111 1111 1111">
                                            4111 1111 1111 1111
                                        </CopyToClipboard>
                                        <h1 className="text-sm font-h-b text-gray-600">
                                            Card (MasterCard)
                                        </h1>
                                        <CopyToClipboard textToCopy="5267 3181 8797 5449">
                                            5267 3181 8797 5449
                                        </CopyToClipboard>
                                    </div>
                                    <div>
                                        <p className="text-sm font-h-b text-gray-600">CVV</p>
                                        <p>Any 3 digit no</p>
                                    </div>
                                    <div >
                                        <p className="text-sm font-h-b text-gray-600">Expiry Date</p>
                                        <p>Any future date</p>
                                    </div>
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Cold Server Start!</div>

                                <div className="font-t text-sm">
                                    Sometimes on initial page load website might take upto<span className="font-t-b"> 30 sec </span> to display products!
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Limitations!</div>

                                <div className="font-t text-sm">
                                    Maximum <span className="font-t-b"> five </span> orders can be placed from one account!
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Rate Limited Requests</div>
                                <div className="font-t text-sm">
                                    <span className="font-t-b"> 300 </span> Requests from a single IP Address within an hour!
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
