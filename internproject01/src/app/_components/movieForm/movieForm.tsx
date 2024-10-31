import React, { useEffect } from "react";
import { InputFiled } from "@/libs/components/Input/input";
import { TextArea } from "@/libs/components/textArea/textArea";
import FormHandler from "react-form-buddy";
import { IMovie } from "@/libs/types";
import { Button } from "@/libs/components/button";
import { addMovie, updateMovie } from "@/services";
import { useMoviesStore } from "@/store";
import { uploadImageToCloudinary } from "@/utils/imageUpload";

interface MovieFormProps {
  type: "Add" | "Edit" | "Delete";
  movieData?: IMovie | null;
  onClose?: () => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  movieData,
  onClose,
  type = "Add",
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { movies, setMoviesAction } = useMoviesStore();
  const [images, setImages] = React.useState<any>(null);

  const validate = (values: any) => {
    let errors: any = {};
    if (!values?.title) {
      errors.title = "Title is required";
    }

    if (!values?.releaseYear) {
      errors.releaseYear = "Release year is required";
    } else if (
      values?.releaseYear &&
      (values?.releaseYear < 1900 ||
        values?.releaseYear > new Date().getFullYear())
    ) {
      errors.releaseYear = "Invalid year";
    }

    if (!values?.duration) {
      errors.duration = "Duration is required";
    } else if (
      values?.duration &&
      (values?.duration < 0 || values?.duration > 500)
    ) {
      errors.duration = "Invalid duration";
    }

    if (!values?.description) {
      errors.description = "Description is required";
    }

    if (!values?.thumbnail) {
      errors.thumbnail = "Thumbnail is required";
    }

    return errors;
  };

  const submitForm = () => {
    setIsSubmitting(true);
  };

  const { handleChange, handleSubmit, values, errors, setValue, initForm } =
    FormHandler(submitForm, validate);

  const onFileChange = async (file: any) => {
    console.log("onFileChange", file);
    if (file) {
      setImages(file);
      try {
        setIsLoaded(true);
        const imageUrl = await uploadImageToCloudinary(file);
        setValue({ thumbnail: imageUrl });
        console.log("Image uploaded to Cloudinary:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoaded(false);
      }
    }
  };

  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    if (type === "Edit") {
      updateMovie(values._id, values, (res) => {
        if (res?.data) {
          console.log("Movie Updated:", res.data);
          setMoviesAction(
            movies.map((movie) =>
              movie._id === values._id ? { ...movie, ...values } : movie
            )
          );
        } else {
          console.error("Failed to update movie:", res?.statusText);
        }
        setIsLoaded(false);
        setIsSubmitting(false);
        if (onClose) {
          onClose();
        }
      });
    } else {
      setIsLoaded(true);
      addMovie(values, (res) => {
        if (res?.data) {
          console.log("Movie Added:", res.data);
          setMoviesAction([...movies, res.data]);
        } else {
          console.error("Failed to add movie:", res?.statusText);
        }
        setIsLoaded(false);
        setIsSubmitting(false);
        if (onClose) {
          onClose();
        }
      });
    }
  }, [isSubmitting]);

  useEffect(() => {
    initForm(movieData);
  }, [type]);

  console.log("Movie Form Values:", values);

  console.log("Movie Form sd:", images);

  return (
    <div className="overflow-y-auto max-h-80 px-2">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputFiled
          type="text"
          label="Movie Name"
          placeholder="Enter movie name"
          name="title"
          value={values?.title || ""}
          onChange={handleChange}
          error={errors?.title}
        />
        <TextArea
          label="Description"
          name="description"
          rows={3}
          value={values?.description || ""}
          onChange={handleChange}
          error={errors?.description}
        />
        <InputFiled
          type="number"
          label="Release Year"
          name="releaseYear"
          placeholder="e.g., 2021"
          value={values?.releaseYear || ""}
          onChange={handleChange}
          error={errors?.releaseYear}
        />
        <InputFiled
          type="number"
          label="Movie Duration (minutes)"
          name="duration"
          placeholder="e.g., 120"
          value={values?.duration || ""}
          onChange={handleChange}
          error={errors?.duration}
        />
        <label className="block text-sm font-medium text-gray-700">
          Thumbnail Upload
        </label>
        <label className="flex flex-col items-center mt-1 p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
          <span className="text-gray-600">
            {images ? images?.name : "Upload an image"}
          </span>
          <input
            onChange={(e: any) => onFileChange(e.target.files[0])}
            type="file"
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
          />
        </label>
        {errors?.thumbnail && (
          <p className="text-red-500 text-xs">{errors?.thumbnail}</p>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <Button text="Cancel" onClick={() => onClose} variant="secondary" />
          <Button
            text={type}
            variant="customPink"
            isLoading={isLoaded}
            onClick={() => handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
