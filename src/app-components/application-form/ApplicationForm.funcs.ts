import { messages } from "@/constants/messages";

export function createApplicationMessage(
  code: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string
) {
  return messages.applyForm
    .replace("[NCT code]", code)
    .replace("[First Name]", firstName || "[First Name]")
    .replace("[Last Name]", lastName || "[Last Name]")
    .replace("[Phone Number]", phoneNumber || "[Phone Number]")
    .replace("[Email Address]", email || "[Email Address]");
}
