import Form from "next/form";
import Button from "@/base-components/button/Button";
import { Input } from "@/base-components/input/Input";
import { Checkbox } from "@/base-components/input/Checkbox";

export default function Filter() {
  return (
    <div className="w-full p-10">
      <h2 className="text-green-600 text-5xl font-semibold pb-10">Filters</h2>
      <Form action="">
        <div className="flex flex-col gap-5">
          <Input name="city" label="City" placeholder="Enter your city" />
          <Input name="state" label="State" placeholder="Enter your state" />
          <Input
            name="condition"
            label="Condition"
            placeholder="Enter Condition"
          />
          <Input
            name="age"
            label="Age"
            placeholder="Enter your age"
            type="number"
          />
          <Checkbox
            id="afhv"
            name="afhv"
            label="Allowed for healthy volunteers"
            type="checkbox"
          />
          <Button variant="primary" type="submit" className="py-4">
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}
