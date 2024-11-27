import React, { TextareaHTMLAttributes } from "react";

interface InputProps {
  type?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void | TextareaHTMLAttributes<HTMLTextAreaElement>;
  placeholder?: string;
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}
export default function InputField({
  type = "text",
  value,
  onChange,
  placeholder = "",
  label,
  id,
  name,
  disabled = false,
  error,
  className,
}: InputProps) {
  return (
    <div className={`input-field`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          name={name}
          rows={5}
          cols={50}
          disabled={disabled}
          className={`${className} ${error ? "input-error" : ""} p-2`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          id={id}
          name={name}
          disabled={disabled}
          className={`${className} ${error ? "input-error" : ""} p-2`}
        />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
