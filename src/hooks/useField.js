import { useState, useEffect } from 'react';

const checkValid = (value, validator) => 
    value &&
    value.length >= 0 && 
    (validator ? validator(value) : true);

export default (initValue = '', validator) => {
    const [value, setValue] = useState(initValue);
    const [isValid, setIsValid] = useState(checkValid(initValue));
    const [handler, setHandler] = useState(null);
    useEffect(
        () => {
            setIsValid(checkValid(value, validator));
        },
        [value, validator],
    );
    useEffect(
        () => {
            setHandler(() => ({ target: { value }}) => setValue(value));
        },
        [value],
    );
    return [value, isValid, handler];
}