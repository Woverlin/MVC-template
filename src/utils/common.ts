/**
 * convertObjectToEnum : converts object to enum
 * @param {Object} obj : object to be converted
 * @return {Array} : converted Array
 */
function convertObjectToEnum<T>(obj: Record<string, T>): T[] {
  const enumArr: T[] = Object.values(obj);
  return enumArr;
}

export default { convertObjectToEnum };
