// actions.js
export const filterbooks = (books) => ({
    type: 'LOAD_FILTER_BOOKS',
    payload: { books },
  });