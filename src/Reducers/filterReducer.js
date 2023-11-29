// reducers/filterReducer.js
import store from './Store';
const {status,isLoading,totalcount, books, error } = useSelector((state) => state.books);


const initialFilterState = {
    filter_products: [],
    all_products: [],
    sorting_value: "highest",
    filters: {
      text: "",
      genre: "all",
      BookAuthor: "all",
      maxPrice: 0,
      price: 0,
      minPrice: 0,
      ratings: 0,
    },
    fetchedBooks: [], // Add this property to store the already fetched books
  };
  
  const filterReducer = (state = initialFilterState, action) => {
    switch (action.type) {
      case 'UPDATE_FILTERS':
        return {
          ...state,
          filters: {
            ...state.filters,
            ...action.payload,
          },
        };
      // Add more cases as needed
      default:
        return state;
    }
  };
  
  export default filterReducer;
  