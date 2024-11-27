import React from "react";
interface FormFieldWrapperProps {
  children: React.ReactNode;
  span?: number;
}
export default function FormFieldWrapper({
  children,
  span,
}: FormFieldWrapperProps) {
  return <div className={`col-span-6 sm:col-span-${span}`}>{children}</div>;
}
