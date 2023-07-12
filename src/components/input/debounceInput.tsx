import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";

interface DebounceInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  withIcon?: boolean;
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: 200;
}

export const DebounceInput = ({
  onChange,
  value: initialValue,
  withIcon,
  debounce,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...props
}: DebounceInputProps) => {
  const [inputValue, setInputValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <>
      <div className="relative md:max-w-sm">
        <Input
          placeholder="Search for products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {withIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  );
};
