import { useState, useEffect } from 'react';

const prefix = id => `app:${id}`;
const useLocalStorage = (id, initialValue) => {
    const lsid = prefix(id);
    const value = localStorage.getItem(lsid);
    const [state, setState] = useState(value || initialValue);
    useEffect(
        () => localStorage.setItem(lsid, state),
        [lsid, state],
    );
    return [state, setState];
};

export default useLocalStorage;