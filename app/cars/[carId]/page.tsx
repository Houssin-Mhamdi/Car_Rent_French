"use client";
import FormFieldWrapper from "@/components/FormFieldWrapper";
import InputField from "@/components/InputField";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CarBooking({ params }: { params: { carId: number } }) {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [minTime, setMinTime] = useState<string>("");
  useEffect(() => {
    // Dynamically set the minimum time to the current hour
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, "0");
    setMinTime(`${currentHour}:00`);
  }, []);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = event.target.value;
    setSelectedTime(time);
  };

  return (
    <section className="container mx-auto px-32 py-20">
      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        {/* First Name Input */}
        <FormFieldWrapper>
          <InputField
            type="text"
            id="name"
            name="name"
            label="First Name"
            className="h-8 mt-1 border w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Email Input */}
        <FormFieldWrapper>
          <InputField
            type="email"
            id="email"
            name="email"
            label="Email"
            className="h-8 border mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Phone Input */}
        <FormFieldWrapper>
          <InputField
            type="text"
            id="phone"
            name="phone"
            label="Phone"
            className="h-8 border mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Date Input */}
        <FormFieldWrapper span={3}>
          <label
            htmlFor="datePicker"
            className="block text-sm font-medium text-gray-700"
          >
            start Date
          </label>
          <input
            id="datePicker"
            type="date"
            min={new Date().toISOString().split("T")[0]} // Minimum date is today
            className="datepickerDate xs:max-md:landscape mt-1 h-8 border w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Time Picker */}
        <FormFieldWrapper span={3}>
          <label
            htmlFor="timePicker"
            className="block text-sm font-medium text-gray-700"
          >
            start Time
          </label>
          <input
            id="timePicker"
            type="time"
            step="3600" // 1-hour intervals
            min={minTime} // Minimum time is the current hour
            value={selectedTime}
            onChange={handleTimeChange}
            className="h-8 border mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Date Input */}
        <FormFieldWrapper span={3}>
          <label
            htmlFor="datePicker"
            className="block text-sm font-medium text-gray-700"
          >
            end Date
          </label>
          <input
            id="datePicker"
            type="date"
            min={new Date().toISOString().split("T")[0]} // Minimum date is today
            className="datepickerDate xs:max-md:landscape mt-1 h-8 border w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Time Picker */}
        <FormFieldWrapper span={3}>
          <label
            htmlFor="timePicker"
            className="block text-sm font-medium text-gray-700"
          >
            end Time
          </label>
          <input
            id="timePicker"
            type="time"
            step="3600" // 1-hour intervals
            min={minTime} // Minimum time is the current hour
            value={selectedTime}
            onChange={handleTimeChange}
            className="h-8 border mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Message Input */}
        <FormFieldWrapper>
          <InputField
            type="textarea"
            id="message"
            name="message"
            label="Message"
            className="border mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
          />
        </FormFieldWrapper>

        {/* Submit Button */}
        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Book now
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            i want to shoose a diffrent car{" "}
            <Link href="/" className="text-gray-700 underline" prefetch>
              click here
            </Link>
            .
          </p>
        </div>
      </form>
    </section>
  );
}
