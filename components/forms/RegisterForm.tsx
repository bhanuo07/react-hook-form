"use client";
import React, { Fragment } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DevTool } from "@hookform/devtools";
type address = {
  street: string;
  state: string;
  pincode: Number | undefined;
  city: string;
};
type FormSchemaType = {
  Username?: string;
  name?: string;
  age?: Number | undefined;
  website?: string;
  allAddress?: address[];
};
const addressSchema = yup.object().shape({
  street: yup.string().required(),
  state: yup.string().required(),
  pincode: yup
    .number()
    .required("Pincode is Required")
    .positive()
    .moreThan(100000, "Pincode must be six digit")
    .lessThan(999999, "Pincode must be six digit")
    .integer("Pincode Must be a Number"),
  city: yup.string().required(),
});
const formSchema: yup.Schema<FormSchemaType> = yup.object().shape({
  Username: yup
    .string()
    .required("Usename is Required")
    .min(3, "Minimum length is 3 characters")
    .max(40, "Maximum length is 40 characters"),
  name: yup
    .string()
    .required("Name is Required")
    .min(5, "Minimum length is 5 characters")
    .max(40, "Maximum length is 40 characters"),
  age: yup
    .number()
    .required("Age is Required")
    .integer("Age Must be a Number")
    .moreThan(18, "Age cannot be less than 18"),
  website: yup
    .string()
    .required("Website Url must be Required")
    .url("Must be a URL"),
  allAddress: yup.array().of(addressSchema),
  // address: yup.object().shape({
  //   street: yup.string().required(),
  //   state: yup.string().required(),
  //   pincode: yup
  //     .number()
  //     .required("Pincode is Required")
  //     .positive()
  //     .moreThan(100000, "Pincode must be six digit")
  //     .lessThan(999999, "Pincode must be six digit")
  //     .integer("Pincode Must be a Number"),
  //   city: yup.string().required(),
  // }),
});
const defaultvals: FormSchemaType = {
  Username: "User",
  name: "BHanu",
  age: 11,
  website: "heh",
};
const RegisterForm = () => {
  const form = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    defaultValues: defaultvals,
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "allAddress",
    control,
  });
  const hehe = (data: any) => {
    console.log(data);
    console.log("hehehe");
  };
  const emptyAddress = {
    street: "",
    state: "",
    pincode: Number,
    city: "",
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(hehe)}
        className="w-1/2 mt-20 grid grid-cols-2 gap-3 mx-auto border-[1px] text-xs border-gray-400 p-5"
      >
        <div className="flex flex-col ">
          <label>UserName</label>
          <input className="form-input" type="text" {...register("Username")} />
          <p className="error-message">{errors.Username?.message}</p>
        </div>
        <div className="flex flex-col">
          <label>Name</label>
          <input className="form-input" type="text" {...register("name")} />
          <p className="error-message">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col">
          <label>Website</label>
          <input className="form-input" type="text" {...register("website")} />
          <p className="error-message">{errors.website?.message}</p>
        </div>
        <div className="flex flex-col">
          <label>Age</label>
          <input className="form-input" type="number" {...register("age")} />
          <p className="error-message">{errors.age?.message}</p>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-3">
          {fields.map((field, index) => (
            <>
              <p className="col-span-2 font-semibold">Address {index + 1}</p>
              <div className="flex flex-col">
                <label>Street</label>
                <input
                  className="form-input"
                  type="text"
                  {...register(`allAddress.${index}.street`)}
                />
                <p className="error-message">
                  {errors?.allAddress?.[index]?.street?.message}
                </p>
              </div>
              <div className="flex flex-col">
                <label>City</label>
                <input
                  className="form-input"
                  type="text"
                  {...register(`allAddress.${index}.city`)}
                />
                <p className="error-message">
                  {errors?.allAddress?.[index]?.city?.message}
                </p>
              </div>
              <div className="flex flex-col">
                <label>Pincode</label>
                <input
                  className="form-input"
                  type="number"
                  {...register(`allAddress.${index}.pincode`)}
                />
                <p className="error-message">
                  {errors?.allAddress?.[index]?.pincode?.message}
                </p>
              </div>
              <div className="flex flex-col">
                <label>State</label>
                <input
                  className="form-input"
                  type="text"
                  {...register(`allAddress.${index}.state`)}
                />
                <p className="error-message">
                  {errors?.allAddress?.[index]?.state?.message}
                </p>
              </div>
              <p onClick={() => remove(index)}>Remove</p>
            </>
          ))}
          <p onClick={() => append(emptyAddress)}>Add New Address</p>
        </div>
        <p></p>
        <button
          // onClick={handleSubmit(hehe)}
          type="submit"
          className="bg-gray-800 block w-fit mx-auto col-span-2 text-white px-4 py-2 rounded-full "
        >
          Submit
        </button>
        {/* <DevTool control={control} /> */}
      </form>
    </>
  );
};

export default RegisterForm;
