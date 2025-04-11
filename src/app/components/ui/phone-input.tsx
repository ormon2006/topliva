// components/ui/phone-input.tsx
import { forwardRef } from "react";
import { Input, InputProps } from "./input";

interface PhoneInputProps extends InputProps {
  defaultCountry?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ defaultCountry = "KG", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="tel"
        {...props}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";