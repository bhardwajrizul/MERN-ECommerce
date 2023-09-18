import Panel from "../components/Panel"
import Carousel from "../components/Carousel"
import Card from "../components/Card"
import Button from "../components/Button"
import Feature from "../components/Feature"
import StyleSpan from "../components/StyleSpan"
import IconMap from "../components/IconMap"
import Review from "../components/Review"

import { AiOutlineArrowRight } from 'react-icons/ai'


/* eslint-disable */
export default function Homepage({ cardData, features }) {

    const renderedCards = cardData.map((card) => {
        return <Card key={card.id} title={card.title} desc={card.desc} image={card.image} />
    })

    const renderedFeatures = features.map((feature) => {
        return <Feature key={feature.title} Icon={IconMap(feature.iconName)} title={feature.title} description={feature.description} />
    })

    return (
        <div>
            
            {/* Carousel */}
            <Panel className='h-[35rem] overflow-hidden rounded'>
                <Carousel />
            </Panel>
            {/* TRENDING */}
            <Panel className="rounded pt-8 pb-8">
                <h1 className="text-center text-4xl text-black font-h-b mt-8 mb-8">Know what's <StyleSpan>trending!</StyleSpan></h1>
                <Panel className="grid justify-center items-center  md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 auto-cols-auto auto-rows-auto">
                    {renderedCards}
                    <Button dark className="justify-self-center w-48">Show More <AiOutlineArrowRight /> </Button>
                </Panel>
            </Panel>

            {/* Features */}
            <Panel className='bg-base-100 rounded border pt-8'>
                <h1 className="font-h-b pt-8 pb-4 text-4xl text-center ">
                    Our <StyleSpan>Promise!</StyleSpan>
                </h1>
                <Panel className=" bg-base-100 rounded pt-8 grid justify-center items-stretch  md:grid-cols-2 lg:grid-cols-3 auto-cols-auto auto-rows-auto">
                    {renderedFeatures}
                </Panel>
            </Panel>

            {/* Reviews */}
            <Panel className='border pt-8'>
                <h1 className="text-4xl font-h-b text-center pt-8">
                    <StyleSpan>Don't</StyleSpan> just trust us!
                </h1>
                <Review />
            </Panel>

            
        </div>
    )
}