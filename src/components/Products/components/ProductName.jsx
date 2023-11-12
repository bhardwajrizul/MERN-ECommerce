import Panel from "../../Panel"
function ProductName({ product }) {
    return (
        <Panel className='bg-base-100 shadow-sm border flex flex-col py-1 rounded-full mb-2'>
            <h1 className="text-2xl font-h-b my-1 ml-2 text-center">
                {product?.name ? product?.name : 'Name not available'}
            </h1>
        </Panel>
    )
}

export default ProductName