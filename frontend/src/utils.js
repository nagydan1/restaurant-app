export const getMenuItemIdsArray = (array) => array.map((item) => item.menuItemId);
export const getQuantitiesArray = (array) => array.map((item) => item.quantity);
export const calculateTotalPrice = (quantitiesArray, pricesArray) => quantitiesArray
  .map((quantity, index) => quantity * pricesArray[index])
  .reduce((a, b) => a + b, 0);
