"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step } from "@/app-components/stepper/Step";
import { Stepper } from "@/app-components/stepper/Stepper";
import { Input } from "@/base-components/input/Input";
import { Checkbox } from "@/base-components/input/Checkbox";
import {
  ApplicationFormValidation,
  createApllicationSchema,
} from "./application-schema";
import { Radio } from "@/base-components/input/Radio";
import { createApplicationMessage } from "@/app-components/application-form/ApplicationForm.funcs";
import { apiPost } from "@/api/api";

interface ApplicaionFormProps {
  nctId: string;
  conditions: string[];
  locations: string[];
  status: string;
  criterias: string[];
  validationData: ApplicationFormValidation;
}

export default function ApplicationForm({
  nctId,
  conditions,
  locations,
  status,
  criterias,
  validationData,
}: ApplicaionFormProps) {
  const applicationSchema = createApllicationSchema(validationData);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    mode: "onChange",
    defaultValues: {
      criterias: [],
      conditions: [],
      recieveEmail: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    await apiPost("/api/apply", data);
  };

  const age = useWatch({ control, name: "age" });
  const zip = useWatch({ control, name: "zip" });
  const selectedConditions = useWatch({ control, name: "conditions" });
  const location = useWatch({ control, name: "location" });
  const selectedCriterias = useWatch({ control, name: "criterias" });
  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });
  const phoneNumber = useWatch({ control, name: "phoneNumber" });
  const email = useWatch({ control, name: "email" });

  const applicationMessage = useMemo(
    () =>
      createApplicationMessage(nctId, firstName, lastName, phoneNumber, email),
    [nctId, firstName, lastName, phoneNumber, email]
  );

  return (
    <div className="w-full flex flex-col gap-10">
      {isSubmitSuccessful ? (
        <div className="h-96 w-full py-60 flex justify-center text-center items-center">
          <h1 className="text-5xl text-green-600 font-semibold">
            Thank you for your application, we appreciate it!
          </h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stepper>
            <Step
              title="Basic information"
              subtitle="Provide your basic information"
              disabled={
                !age || !zip || !!errors?.age?.message || !!errors?.zip?.message
              }
            >
              <div className="flex gap-5">
                <Input
                  {...register("age")}
                  label="Age"
                  type="number"
                  placeholder="Enter your age"
                  errorMessage={errors?.age?.message}
                ></Input>
                <Input
                  label="ZIP code"
                  placeholder="Enter your ZIP code"
                  {...register("zip")}
                  min={5}
                  max={5}
                  errorMessage={errors?.zip?.message}
                ></Input>
              </div>
            </Step>
            <Step
              title="Conditions"
              subtitle="Check all the conditions applicable to you"
              disabled={
                !selectedConditions.length || !!errors?.conditions?.message
              }
            >
              {conditions.map((cond) => (
                <Checkbox
                  {...register("conditions")}
                  className="text-2xl"
                  id={cond}
                  key={cond}
                  value={cond}
                  label={cond}
                />
              ))}
              {errors?.conditions?.message && (
                <p className="text-red-500 font-medium text-xl">
                  {errors?.conditions?.message}
                </p>
              )}
            </Step>
            <Step
              title="Trial location"
              subtitle="Locations sorted by proximity to your ZIP code"
              disabled={!location || !!errors?.location?.message}
            >
              {locations.map((location) => (
                <div
                  className="rounded-4xl p-10 flex flex-col gap-5 bg-green-50"
                  key={location}
                >
                  <Radio
                    className="text-2xl"
                    id={location}
                    label={location}
                    value={location}
                    {...register("location")}
                  />
                  <span className="p-4 w-fit rounded-4xl text-2xl  border-2 bg-green-600 text-white font-semibold">
                    {status.split("_").join(" ")}
                  </span>
                </div>
              ))}
              {errors?.location?.message && (
                <p className="text-red-500 font-medium text-xl">
                  {errors?.location?.message}
                </p>
              )}
            </Step>
            <Step
              title="Eligibility"
              subtitle="Check all the criteria applicable to you"
              disabled={
                !selectedCriterias.length || !!errors?.criterias?.message
              }
            >
              {criterias.map((criteria) => (
                <Checkbox
                  className="text-2xl"
                  key={criteria}
                  id={criteria}
                  label={criteria}
                  value={criteria}
                  {...register("criterias")}
                />
              ))}
              {errors?.criterias?.message && (
                <p className="text-red-500 font-medium text-xl">
                  {errors?.criterias?.message}
                </p>
              )}
            </Step>
            <Step
              title="Application"
              subtitle="Add your application details"
              disabled={
                !firstName ||
                !lastName ||
                !phoneNumber ||
                !email ||
                !!errors.firstName?.message ||
                !!errors.lastName?.message ||
                !!errors.phoneNumber?.message ||
                !!errors.email?.message
              }
            >
              <div className="grid grid-cols-2 gap-5">
                <Input
                  label="First name"
                  placeholder="Enter your first name"
                  {...register("firstName")}
                  errorMessage={errors.firstName?.message}
                ></Input>
                <Input
                  label="Last name"
                  placeholder="Enter your last name"
                  {...register("lastName")}
                  errorMessage={errors.lastName?.message}
                ></Input>
                <Input
                  label="Phone number"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                ></Input>
                <Input
                  label="Email address"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                ></Input>
              </div>
              <p className="text-3xl font-medium text-gray-600">
                This email will go to the researcher—you may edit it or send
                as-is before &apos;Submit&apos;
              </p>
              <textarea
                className="w-full text-black h-88 text-3xl bg-green-50 rouded-xl p-10"
                readOnly
                placeholder={applicationMessage}
              />
              <Checkbox
                className="text-2xl"
                id="privacyPolicy"
                label="I agree to Privacy Policy and Terms of Use"
                {...register("privacyPolicy")}
              />
              {errors?.privacyPolicy?.message && (
                <p className="text-red-500 font-medium text-xl">
                  {errors?.privacyPolicy?.message}
                </p>
              )}
              <Checkbox
                className="text-2xl"
                id="recieveEmail"
                label={
                  "I would like to recieve email notifications about clinical trials available in my area"
                }
                {...register("recieveEmail")}
              />
            </Step>
          </Stepper>
        </form>
      )}
    </div>
  );
}
