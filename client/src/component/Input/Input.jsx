import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      value,
      onChange,
      placeholder,
      type = "text",
      classname,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${classname} w-full md:w-64 lg:w-80 xl:w-96 border-2 border-violet-500 bg-violet-950 p-2 placeholder-slate-300 text-gray-100 focus:outline-none focus:border-violet-500`}
          value={value}
          onChange={onChange}
          autoComplete="off"
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
