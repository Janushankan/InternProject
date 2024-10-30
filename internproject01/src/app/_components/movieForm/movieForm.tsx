import React, { useEffect } from "react";
import { InputFiled } from "@/libs/components/Input/input";
import { TextArea } from "@/libs/components/textArea/textArea";
import FormHandler from "react-form-buddy";
import { IMovie } from "@/libs/types";
import { Button } from "@/libs/components/button";

interface MovieFormProps {
  type: "add" | "edit" | "delete";
  movieData?: IMovie | null;
  onClose?: () => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  movieData,
  onClose,
  type,
}) => {
  const validate = (values: any) => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    return errors;
  };

  const submitForm = () => {
    console.log("Form submitted successfully!");
  };

  const { handleChange, handleSubmit, values, errors, setValue,initForm } = FormHandler(
    submitForm,
    validate
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      setValue("thumbnail", file);
    }

  };


  useEffect(() => {
    if(type !== "edit") {
        return 
    }

    initForm(movieData);
  }, [type]);


  return (
    <div className="overflow-y-auto max-h-80 px-2">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <InputFiled
          type="text"
          label="Movie Name"
          placeholder="Enter movie name"
          name="title"
          value={values?.title || ""}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          name="description"
          rows={3}
          value={values?.description || ""}
          onChange={handleChange}
        />
        <InputFiled
          type="number"
          label="Release Year"
          name="releaseYear"
          placeholder="e.g., 2021"
          //   min={1900}
          //   max={currentYear}
          value={values?.releaseYear || ""}
          onChange={handleChange}
        />
        <InputFiled
          type="number"
          label="Movie Duration (minutes)"
          name="duration"
          placeholder="e.g., 120"
          value={values?.duration || ""}
          onChange={handleChange}
        />
        <InputFiled
          type="file"
          label="Thumbnail Image"
          name="thumbnail"
          value=""
          onChange={onFileChange}
        />

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            text="Cancel"
            onClick={() => onClose && onClose()}
            variant="secondary"
          />
          <Button
            text={type}
            variant="customPink"
            onClick={() => handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
