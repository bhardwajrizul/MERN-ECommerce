import Panel from "../../Panel"

export default function ProductDescription({ product }) {
    return (
        <>
            <Panel className='bg-base-100 shadow-sm border flex flex-col py-1 rounded self-center mt-5'>
                <h1 className="text-lg font-h-b my-1 ml-2 text-center">
                    Description
                </h1>
            </Panel>
            <Panel className="bg-base-100">
                <p className="font-t p-6">
                    {product?.description}
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis, cum! Fugit, quidem nesciunt. Doloremque, vero saepe magnam earum deleniti illo libero quidem voluptas voluptates? Hic omnis vel enim ratione sit?
                </p>
            </Panel>
        </>
    )
}