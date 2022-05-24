import { LiteralUnion, RegisterOptions } from "react-hook-form";

export const errorTypeToMessage = (
  errorType: LiteralUnion<keyof RegisterOptions, string>
) => {
  switch (errorType) {
    case "required":
      return "This field is required";

    default:
      return "Something went wrong";
  }
};
