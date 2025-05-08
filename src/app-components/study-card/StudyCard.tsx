import { routeNames } from "@/constants/route-names";
import Link from "@/base-components/link/Link";
import ShowMore from "@/base-components/show-more/ShowMore";

interface StudyCardProps {
  title: string;
  status: string;
  sponsor: string;
  locations: string[];
  code: string;
  conditions: string[];
}

export default function StudyCard({
  title,
  status,
  sponsor,
  locations,
  code,
  conditions,
}: StudyCardProps) {
  return (
    <div className="border-2 rounded-xl p-10 text-lg lg:text-xl border-green-200 bg-white">
      <div className="flex flex-col gap-5 h-full">
        <header>
          <span className="text-green-600 rounded-xl bg-green-50 p-2 lg:p-3 text-base lg:text-lg float-right font-bold">
            {status.split("_").join(" ")}
          </span>
          <h2 className="text-green-600 text-xl lg:text-3xl font-semibold pb-1">
            {title}
          </h2>
        </header>
        <div className="flex flex-col gap-1">
          <p>
            <span className="text-gray-500">Sponsor: </span>
            {sponsor}
          </p>
          <div className="flex flex-row flex-wrap gap-2 w-full">
            <span className="text-gray-500">Location:</span>
            <ShowMore>
              {locations.map((location, i) => (
                <address className="not-italic" key={location}>
                  {location}
                  {i === locations.length - 1 ? "" : ", "}
                </address>
              ))}
            </ShowMore>
          </div>
          <p>
            <span className="text-gray-500">Code: </span>
            {code}
          </p>
        </div>
        <div className="rounded-xl bg-green-50 p-5 ">
          <h3 className="text-xl lg:text-2xl font-medium pb-5 text-green-600">
            Conditions:
          </h3>
          <ul className="flex-col flex gap-2">
            {conditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-2 lg:justify-between lg:mt-auto">
          <Link
            className="w-full md:w-1/2 text-center"
            href={`${routeNames.studies}/${code}`}
            variant="primary"
          >
            Learn More
          </Link>
          <Link
            className="w-full md:w-1/2 text-center"
            href={`${routeNames.apply}/${code}`}
            variant="outline"
          >
            Apply To Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
