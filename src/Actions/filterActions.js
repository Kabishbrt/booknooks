// actions.js
export const filterbooks = (books) => ({
    type: 'LOAD_FILTER_BOOKS',
    payload: { books }
  });

export const updateFilterValue = (name, value) => ({
    type: "UPDATE_FILTERS_VALUE",
    payload: { name, value }
});

export const clearFilters = (maxPrice) => ({
  
  type: "CLEAR_FILTERS",
  payload: {maxPrice}
});

export const sortbooks = () => ({
  type: "SORTING_PRODUCTS",
});

export const sorting =(value) =>({
  // console.log(userValue);
  type: "GET_SORT_VALUE", 
  payload: {value}
});

export const filterexec= ()=>({
  type: "FILTER_PRODUCTS"
})

