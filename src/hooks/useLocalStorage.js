import { useState, useEffect } from 'react';

const makeId = id => `storage:${id}`;
const useLocalStorage = (id, initData = null) => {
  let lsid = makeId(id);
  const [value, setValue] = useState(
    localStorage.getItem(lsid) || initData,
  );
  useEffect(
    () => localStorage.setItem(lsid, value),
    [lsid, value],
  );
  return [value, setValue];
};

export default useLocalStorage;
