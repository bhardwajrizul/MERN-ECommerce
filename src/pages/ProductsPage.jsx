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

const NoProducts = () => {
    return (
        <div className="alert flex flex-col gap-6 col-span-full p-20">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span className="font-t-b text-3xl ml-4">No Match Found!</span>
            </div>
            <div className="text-t-b text-xl text-lime">
                Try chaning your filters.
            </div>
        </div>
    )
}

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
        content = <Skeleton times={6} className='h-96 sm:w-[90%] w-36 mx-2 my-6 px-4' />
    } else if (error) {
        console.error(error)
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
        content = renderedProducts.length > 0
            ? renderedProducts
            : !isLoading && !isFetching && <NoProducts />
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