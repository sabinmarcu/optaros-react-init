import { useState, useEffect } from 'react';

const checkValid = (value, validator) => 
  value &&
  value.length > 0 &&
  (validator ? !!validator(value) : true);

const makeHandler = setter => 
  () => ({ target: { value }}) => setter(value);

export default (initValue, validator = () => true) => {
  const [value, setValue] = useState(initValue);
  const [isValid, setIsValid] = useState(checkValid(value, validator));
  useEffect(
    () => {
      setIsValid(checkValid(value, validator));
    },
    [value, validator],
  );
  const [handler, setHandler] = useState(makeHandler(setValue));
  useEffect(
    () => {
      setHandler(makeHandler(setValue));
    },
    [value],
  );
  return [value, isValid, handler];
}