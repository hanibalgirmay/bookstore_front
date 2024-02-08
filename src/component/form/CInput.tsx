import React from "react";
import { useFormContext } from "react-hook-form";

interface ICInputFieldProp {
  type?: "text" | "password" | "date" | "number";
  placeholder: string;
  name: string;
  label: string;
  disabled?: boolean;
}

const CInputField = ({
  type = "text",
  label,
  name,
  placeholder,
  disabled,
}: ICInputFieldProp) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const message = errors[name];

  return (
    <div className="w-full">
      <label
        className="mb-1 block font-bold text-black dark:text-white"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        id={name}
        className={`${
          message ? "border-meta-1" : ""
        } invalid:shake2 w-full rounded-lg border-[1.5px] border-graydark/50 bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input`}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
        aria-label={name}
      />
      {message && <span className="text-meta-1">{message?.message}</span>}{" "}
    </div>
  );
};

export default CInputField;
