import React, { useEffect, useState } from "react";
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

interface FormValues {
  _id?: string;
  title: string;
  description: string;
  releaseYear: number | string;
  duration: number | string;
  thumbnail: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  releaseYear?: string;
  duration?: string;
  thumbnail?: string;
}

export const MovieForm: React.FC<MovieFormProps> = ({
  movieData,
  onClose,
  type = "Add",
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { movies, setMoviesAction } = useMoviesStore();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validate = (values: Partial<FormValues>): FormErrors => {
    const errors: FormErrors = {};
    const currentYear = new Date().getFullYear();
    
    if (!values?.title) {
      errors.title = "Title is required";
    }

    if (!values?.releaseYear) {
      errors.releaseYear = "Release year is required";
    } else {
      const year = Number(values.releaseYear);
      if (isNaN(year) || year < 1900 || year > currentYear) {
        errors.releaseYear = `Year must be between 1900 and ${currentYear}`;
      }
    }

    if (!values?.duration) {
      errors.duration = "Duration is required";
    } else {
      const duration = Number(values.duration);
      if (isNaN(duration) || duration <= 0 || duration > 500) {
        errors.duration = "Duration must be between 1 and 500 minutes";
      }
    }

    if (!values?.description) {
      errors.description = "Description is required";
    } else if (values.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    }

    if (!values?.thumbnail && !previewUrl && type === "Add") {
      errors.thumbnail = "Thumbnail is required";
    }

    return errors;
  };

  const submitForm = () => {
    setIsSubmitting(true);
  };

  const { handleChange, handleSubmit, values, errors, setValue, initForm } =
    FormHandler(submitForm, validate);

  const onFileChange = async (file: File | null) => {
    if (!file) return;
    
    setImage(file);
    setUploadError(null);
    
    // Create preview URL for immediate feedback
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    
    try {
      setIsLoaded(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setValue({ thumbnail: imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    if (!isSubmitting) return;

    const handleSubmission = async () => {
      try {
        if (type === "Edit" && values._id) {
          updateMovie(values._id, values as IMovie, (res) => {
            if (res?.data) {
              setMoviesAction(
                movies.map((movie) =>
                  movie._id === values._id ? { ...movie, ...values } : movie
                )
              );
              if (onClose) onClose();
            } else {
              throw new Error(res?.statusText || "Failed to update movie");
            }
          });
        } else {
          setIsLoaded(true);
          addMovie(values as IMovie, (res) => {
            if (res?.data) {
              setMoviesAction([...movies, res.data]);
              if (onClose) onClose();
            } else {
              throw new Error(res?.statusText || "Failed to add movie");
            }
          });
        }
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsLoaded(false);
        setIsSubmitting(false);
      }
    };

    handleSubmission();
  }, [isSubmitting, type, values, movies, setMoviesAction, onClose]);

  useEffect(() => {
    if (movieData?.thumbnail) {
      setPreviewUrl(movieData.thumbnail);
    }
    initForm(movieData || {});
  }, [movieData, initForm]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('http')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleCancel = () => {
    if (onClose) onClose();
  };

  return (
    <div className="overflow-y-auto max-h-[80vh] px-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail Upload
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <label className="flex flex-col items-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex flex-col items-center space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-gray-600 text-sm font-medium">
                  {image ? image.name : "Choose an image"}
                </span>
                <span className="text-gray-500 text-xs">PNG, JPG, GIF up to 5MB</span>
              </div>
              <input
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
              />
            </label>
            
            {previewUrl && (
              <div className="relative h-32 w-full border rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Thumbnail preview" 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
          {(errors?.thumbnail || uploadError) && (
            <p className="text-red-500 text-xs mt-1">
              {uploadError || errors?.thumbnail}
            </p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button 
            text="Cancel" 
            onClick={handleCancel} 
            variant="secondary" 
          />
          <Button
            text={isLoaded ? "Processing..." : type}
            variant="customPink"
            isLoading={isLoaded}
          />
        </div>
      </form>
    </div>
  );
};
