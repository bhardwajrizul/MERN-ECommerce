import { generateRandomProduct } from '../utils/products'
import ProductCard from "../components/ProductCard" 


export default  function ProductsPage() {
    const data = generateRandomProduct(10)
    console.log(data)
    const renderedProducts = data.map((item) => {
        return <ProductCard 
            key={item.name}
            name={item.name} 
            image={item.image} 
            description={item.description} 
            categories={item.categories}
            />
    })
    return (
        <div className='bg-base-100 rounded-lg flex flex-row flex-wrap items-stretch justify-between py-12'>
            {renderedProducts}
        </div>
        
    )
}