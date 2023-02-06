import { useState } from "react";

// for multiple input
function useInput(defaultValue: any) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e: any) {
    const { value }: any = { ...e.target };
    setValue(value);
  }
  return { value, onChange };
}

export default useInput;
