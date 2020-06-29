export default class Util {
  static cycelIndexInArray(array, index) {
    index++;
    if (index > array.length - 1) index = 0;
    return index;
  }
  static getHighIndexInArray(array) {
    let index = [];
    for (let i in array) {
      if (typeof array[i] == "number") {
        if (index.length === 0) {
          index.push(i);
          continue;
        }
        if (array[i] == array[index[0]]) index.push(i);
        if (array[i] > array[index[0]]) {
          index = [];
          index.push(i);
        }
      }
    }
    return index;
  }
  static isArrayEmtpy(array) {
    for (let i in array) {
      if (array[i] != 0) {
        return false;
      }
    }
    return true;
  }
}
