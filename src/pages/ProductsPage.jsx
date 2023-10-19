import Skeleton from "../components/Skeleton";
import ProductCard from "../components/Products/ProductCard"
import ShowMore from "../components/Products/ShowMore";
import Panel from "../components/Panel";
import FilterContainer from "../components/Filter/FilterContainer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useFetchProductsQuery,
    pushNewProductsToPage,
    resetProductsAndPage,
    useFetchFilteredProductsQuery,
    resetAll
} from '../store'

export default function ProductsPage() {


    const dispatch = useDispatch();

    const { products, page, filters } = useSelector((state) => {
        return {
            products: state.products.data,
            page: state.products.page,
            filters: state.filters
        }
    })


    const {
        data,
        error,
        isLoading,
        isFetching
    } = useFetchFilteredProductsQuery({ page, filters })

    useEffect(() => {
        dispatch(resetProductsAndPage())
    }, [filters])



    useEffect(() => {
        if (data?.data) {
            // Determine if it's a filter change or show more based on your action state
            dispatch(pushNewProductsToPage(data.data));
        }
    }, [data]);

    // Reset Products and page on component dismount
    useEffect(() => {
        return () => {
            dispatch(resetProductsAndPage())
        }
    }, [])



    let content;
    if (isLoading) {
        content = <Skeleton times={6} className='h-96 sm:w-96 w-36 mx-2 my-6' />
    } else if (error) {
        console.log(error)
        content = <h1 className="mx-auto my-10 px-6 py-4 rounded bg-red-400">{`Something Went Wrong!`}</h1>
    } else {
        const renderedProducts = products.map((product) => {
            return <ProductCard
                key={product._id}
                name={product.name}
                image={product.image}
                description={product.description}
                categories={product.categories}
                price={product.price}
                discountPercent={product.discountPercent}
                rating={product.rating}
                ratingCount={product.ratingCount}
                gender={product.gender}
                brand={product.brand}
            />
        })
        content = renderedProducts;
    }
    return (

        <Panel className='flex flex-row bg-base-100'>
            <Panel className="w-1/3 relative bg-base-100">
                <FilterContainer />
            </Panel>
            <Panel className='bg-base-100 pb-12 flex flex-col items-center'>
                <Panel className='bg-base-100 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 pb-12'>
                    {content}
                </Panel>

                {
                    !isLoading && !isFetching && !error && page < data.totalPages
                        ? <ShowMore currentPage={data.currentPage} /> // If we want to skip pages we can use currentPage and pass to rudecer
                        : isFetching ? <span className="loading loading-spinner text-error loading-lg"></span>
                            : undefined
                }
            </Panel>
        </Panel>
    )
}