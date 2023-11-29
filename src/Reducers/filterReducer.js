// reducers/filterReducer.js

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: 'highest',
    filters: {
      text: '',
      genre: 'all',
      BookAuthor: 'all',
      avg_rating: 0,
      maxPrice: 0,
      price: 0,
      minPrice: 0,
    },
  };
  
  const filterReducer = (state = initialState, action) => {
    switch (action.type) {
  
    //   case 'UPDATE_FILTERS_VALUE':
    //     return {
    //       ...state,
    //       filters: {
    //         ...state.filters,
    //         [action.payload.name]: action.payload.value,
    //       },
    //     };
  
    //   case 'CLEAR_FILTERS':
    //     return { ...state, filters: initialState.filters };
  
      case 'LOAD_FILTER_BOOKS':
        return { ...state, all_products: action.payload };
  
    //   case 'FILTER_PRODUCTS':
    //     // Implement your filtering logic here and update filter_products
    //     return { ...state, filter_products };
  
    //   case 'SORTING_PRODUCTS':
    //     // Implement your sorting logic here and update filter_products
    //     return { ...state, filter_products };
  
      default:
        return state;
    }
  };
  
  export default filterReducer;
  