import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdFilterAlt } from "react-icons/md";
import { CInput, CProvider } from "./form";

interface IDropDown {
  value: string;
  label: string;
}

type TDropDown = {
  options: IDropDown[];
  handleDropDownForm: (e: any) => void;
};

const Dropdown = ({ options, handleDropDownForm }: TDropDown) => {
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const currentValues = methods.getValues("filter");
    const updatedValues = checked
      ? [...currentValues, value]
      : currentValues.filter((val: string) => val !== value);
    methods.setValue("filter", updatedValues);
  };
  const handleForm = (e:any) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  };
  useEffect(() => {
    console.log("____-", methods.watch("filter"));
    handleDropDownForm(methods.watch("filter"));
  }, [methods.watch("filter")]);

  return (
    <div className="relative inline-block">
      <button
        className="mt-6 border px-3 py-3 rounded-md flex items-center"
        onClick={toggleDropdown}
      >
        <MdFilterAlt size={26} />
      </button>
      {isOpen && (
        <FormProvider {...methods}>
          <CProvider handleFormSubmit={methods.handleSubmit(handleForm)}>
            <div className="absolute mt-2 py-2 w-40 bg-white border rounded shadow">
              {options.map((item) => (
                <label className="flex flex-row w-full justify-start place-content-start px-3 py-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={item.value}
                    {...methods.register("filter")}
                    onChange={(e) =>
                      handleCheckboxChange(item.value, e.target.checked)
                    }
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </CProvider>
        </FormProvider>
      )}
    </div>
  );
};

export default Dropdown;
