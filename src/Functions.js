// utils.js

export const handleSelection = (list, selectedLists, setSelectedLists) => {
    const updatedLists = selectedLists.includes(list)
      ? selectedLists.filter((g) => g !== list)
      : [...selectedLists, list];
    setSelectedLists(updatedLists);
  };
  
  export const handleViewMoreClick = (prevVisibleLists, setVisibleLists) => {
    setVisibleLists((prevVisibleLists) => prevVisibleLists + 8);
  };
  
  export const handleViewLessClick = (prevVisibleLists, setVisibleLists) => {
    setVisibleLists(4);
    //setVisibleLists((prevVisibleLists) => Math.max(prevVisibleLists - 8, 8));//,8 for the threshold that if difference is less than 8 than visibilelist 8.
  };

  export const handleViewLessbook = (prevVisibleLists, setVisibleLists) => {
    setVisibleLists(16);
    //setVisibleLists((prevVisibleLists) => Math.max(prevVisibleLists - 8, 8));//,8 for the threshold that if difference is less than 8 than visibilelist 8.
  };
  
  export const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + ".." : text;
  };
  