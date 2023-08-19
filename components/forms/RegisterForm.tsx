"use client";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      dirtyFields,
      isDirty,
      isValid,
      isLoading,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      isValidating,
      submitCount,
      touchedFields,
      defaultValues,
    },
  } = useForm();
  return (
    <form>
      <input />
    </form>
  );
};

export default RegisterForm;
