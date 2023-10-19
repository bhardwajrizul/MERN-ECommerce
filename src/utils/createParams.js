function createParams(page, filters) {
    const params = {
        page: page,
        'price[gte]': filters.price.min,
        'price[lte]': filters.price.max,
        'rating[gte]': filters.rating
    };
    
    if (filters.selectedCategories.length > 0) {
        params['categories'] = filters.selectedCategories.join(",");
    }
    
    if (filters.discount) {
        params['discountPercent[gte]'] = filters.discount;
    }
    
    if (filters.gender) {
        params['gender'] = filters.gender.toLowerCase();
    }
    return params;
}

export {createParams}