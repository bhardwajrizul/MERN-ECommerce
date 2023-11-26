import Skeleton from "../components/Skeleton";
import ProductCard from "../components/Products/ProductCard"
import ShowMore from "../components/Products/ShowMore";
import Panel from "../components/Panel";
import FilterContainer from "../components/Filter/FilterContainer";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    useFetchProductsQuery,
    pushNewProductsToPage,
    resetProductsAndPage,
    useFetchFilteredProductsQuery,
    resetAll
} from '../store'
import { useSearchParams } from "react-router-dom";
import PriceFilter from "../components/Filter/components/PriceFilter";
import CategoryFilter from "../components/Filter/components/CategoryFilter";
import DiscountFilter from "../components/Filter/components/DiscountFilter";
import GenderFilter from "../components/Filter/components/GenderFilter";
import RatingFilter from "../components/Filter/components/RatingFilter";

import { isEqual } from 'lodash';

const NoProducts = () => {
    return (
        <div className="alert flex flex-col gap-6 col-span-full p-20">
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-10 w-10 fill-pink-500" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span className="font-h-b text-pink-700 text-4xl ml-4">No Products Found!</span>
            </div>
            <div className="text-t-b text-xl text-lime">
                Try chaning your filters.
            </div>
        </div>
    )
}

export default function ProductsPage() {

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('query') || null;

    const dispatch = useDispatch();


    const { products, page, filters } = useSelector((state) => {
        return {
            products: state.products.data,
            page: state.products.page,
            filters: state.filters
        }
    })

    const prevFilters = useRef(filters);
    const prevSearchQuery = useRef(searchQuery);


    const {
        data,
        error,
        isLoading,
        isFetching
    } = useFetchFilteredProductsQuery({
        page,
        filters,
        searchQuery
    })

    useEffect(() => {
        if (!isEqual(prevFilters.current, filters)) {
            dispatch(resetProductsAndPage());
            prevFilters.current = filters;
        }
        if (!isEqual(prevSearchQuery.current, searchQuery)) {
            dispatch(resetProductsAndPage());
            prevSearchQuery.current = searchQuery;
        }
    }, [filters, searchQuery]);


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
        content = <Skeleton times={6} className='h-96 sm:w-[95%] mx-2 my-6 px-4' />
    } else if (error) {
        console.error(error)
        content = (
            <div className="flex flex-col items-start justify-start">
                <h1 className="mx-auto my-10 px-6 py-4 rounded bg-red-400">{`Something Went Wrong!`}</h1>
                <h1 className="mx-auto my-10 px-6 py-4 rounded bg-red-400">{`Status : ${error.originalStatus || error.status}`}</h1>
            </div>
        )
    } else {
        const renderedProducts = products.map((product) => {
            return <ProductCard
                key={product._id}
                pid={product._id}
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

        <Panel className='flex lg:flex-row flex-col bg-base-100 mt-4'>
            <Panel className="lg:w-3/12 relative bg-base-100">
                <details className="dropdown block lg:hidden">
                    <summary className="m-1 btn w-full">Filters</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
                        <li><PriceFilter /></li>
                        <li><CategoryFilter /></li>
                        <li><DiscountFilter /></li>
                        <li><GenderFilter /></li>
                        <li><RatingFilter /></li>
                    </ul>
                </details>
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