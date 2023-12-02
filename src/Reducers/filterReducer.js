// reducers/filterReducer.js

const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: 'highest',
    filters: {
      text: null,
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
  
      case 'UPDATE_FILTERS_VALUE':      
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.name]: action.payload.value,
          },
        };
  
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: {
                    ...initialState.filters,
                    maxPrice:action.payload.maxPrice,
                    price: action.payload.maxPrice
                }
            };
        
  
      case 'LOAD_FILTER_BOOKS':
        const arrayofbooks = action.payload.books;
       const priceArr = arrayofbooks.map((curElem) => curElem.Price);
      // Calculate the maximum price
       const maxprice = Math.max(...priceArr);
        return { ...state, all_products: action.payload.books,
            filters: {
                ...state.filters, // Preserve other filters if any
                maxPrice: maxprice,
                price: maxprice
              },
        };
  
    //   case 'FILTER_PRODUCTS':
    //     // Implement your filtering logic here and update filter_products
    //     return { ...state, filter_products };

    case 'GET_SORT_VALUE':
      return{
      ...state,
      sorting_value: action.payload.value
      }
  
    case 'SORTING_PRODUCTS':
      let sortedProducts = [...state.all_products];

      switch (state.sorting_value) {
        case 'lowest':
          sortedProducts.sort((a, b) => a.Price - b.Price);
          break;
        case 'highest':
          sortedProducts.sort((a, b) => b.Price - a.Price);
          break;
        case 'a-z':
          sortedProducts.sort((a, b) => {
            const titleA = a.BookTitle && typeof a.BookTitle === 'string' ? a.BookTitle : '';
            const titleB = b.BookTitle && typeof b.BookTitle === 'string' ? b.BookTitle : '';

            // Separate strings starting with numbers or special characters
            const regex = /^[^a-zA-Z]/;
            const isANumberOrSpecialA = regex.test(titleA);
            const isANumberOrSpecialB = regex.test(titleB);

            if (isANumberOrSpecialA && !isANumberOrSpecialB) {
              return 1;
            } else if (!isANumberOrSpecialA && isANumberOrSpecialB) {
              return -1;
            }

            return titleA.localeCompare(titleB);
          });
          break;
        case 'z-a':
          sortedProducts.sort((a, b) => b.BookTitle.localeCompare(a.BookTitle));
            break;
        default:
          // Default to 'highest' if sorting_value is unknown
          sortedProducts.sort((a, b) => b.Price - a.Price);
          break;
      }
      return { ...state, filter_products: sortedProducts };

    case 'FILTER_PRODUCTS':
      const {filter_products,all_products,sorting_value,
        filters: {
          text,
          genre,
          BookAuthor,
          avg_rating,
          maxPrice,
          price,
          minPrice} 
      }= state;
      let tempFilterProduct = [...filter_products];
      

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          const formattedBookAuthor = curElem.BookAuthor.replace(/[.\s]/g, '').toLowerCase();
          const formattedText = text.replace(/[.\s]/g, '').toLowerCase();
          return curElem.BookTitle.toLowerCase().includes(text.toLowerCase()) || formattedBookAuthor.includes(formattedText);
        });
      }
      if(genre !=="all"){
        tempFilterProduct = tempFilterProduct.filter((curElem)=>curElem.genre === genre)
      }
      if(BookAuthor !=="all"){
        tempFilterProduct = tempFilterProduct.filter((curElem)=>curElem.BookAuthor === BookAuthor)
      }
      if(avg_rating !==0){
        tempFilterProduct = tempFilterProduct.filter((curElem)=>curElem.avg_rating >= avg_rating)
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.Price === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.Price <= price
        );
      }
      return {
        ...state,
        filter_products: tempFilterProduct
      }
  
    default:
      return state;
    }
  };
  
  export default filterReducer;
  