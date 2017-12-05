export default function (array, keys, searchQuery) {
  let filteredArray = [];
  let searchKeys = keys;
  for (let i = 0, l = array.length; i < l; i++) {
    for (let j = 0, k = searchKeys.length; j < k; j++) {
      if (array[i][searchKeys[j]].toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) {
        if (filteredArray.indexOf(array[i]) === -1) {
          filteredArray.push(array[i])
        }
      }
    }
  }
  return filteredArray
}
