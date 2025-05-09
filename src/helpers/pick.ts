function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  ...keys: Array<K>
): Pick<T, K> {
  return keys.reduce(
    (subObject, key) => {
      subObject[key] = obj[key];
      return subObject;
    },
    {} as Pick<T, K>,
  );
}

export default pick;
