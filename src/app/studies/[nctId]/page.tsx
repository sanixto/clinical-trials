import { Accordion } from "@/base-components/accordion/Accordion";
import Link from "@/base-components/link/Link";
import ShowMore from "@/base-components/show-more/ShowMore";
import { routeNames } from "@/constants/route-names";
import { getStudy, getUniqueLocationStrings } from "@/studies/studies";

interface StudyPageProps {
  params: { nctId: string };
}

export default async function StudyPage({ params: { nctId } }: StudyPageProps) {
  const study = await getStudy(nctId);
  const {
    statusModule,
    sponsorCollaboratorsModule,
    identificationModule,
    contactsLocationsModule,
    conditionsModule,
    descriptionModule,
  } = study.protocolSection;
  const locations = getUniqueLocationStrings(
    contactsLocationsModule?.locations
  );

  return (
    <main className="p-10 bg-green-50 rounded-xl">
      <div className="border-2 flex flex-col gap-10 rounded-xl p-10 text-xl border-green-200 bg-white">
        <div className="flex flex-col gap-5 h-full">
          <header>
            <span className="rot text-green-600 rounded-xl bg-green-50 p-3 text-lg float-right font-bold">
              {statusModule.overallStatus.split("_").join(" ")}
            </span>
            <h2 className="text-green-600 text-3xl font-semibold pb-1">
              {identificationModule.briefTitle}
            </h2>
          </header>
          <div className="flex flex-col gap-1">
            <p>
              <span className="text-gray-500">Sponsor: </span>
              {sponsorCollaboratorsModule.leadSponsor.name}
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
              {nctId}
            </p>
          </div>
          <div className="rounded-xl bg-green-50 p-5 ">
            <h3 className="text-2xl font-medium pb-5 text-green-600">
              Conditions:
            </h3>
            <ul className="flex-col flex gap-2">
              {conditionsModule.conditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between mt-auto">
            <Link href={`${routeNames.apply}/${nctId}`} variant="outline">
              Apply To Trial
            </Link>
          </div>
        </div>
        <div>
          <Accordion trigger="Study Details">
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-medium text-green-600">
                Brief summary:
              </h3>
              <p>{descriptionModule.briefSummary}</p>
              <div className="grid grid-cols-2 gap-10">
                <div className="rounded-xl bg-green-50 p-5 h-fit">
                  <h3 className="text-2xl font-medium pb-5 text-green-600">
                    Conditions:
                  </h3>
                  <ul className="flex-col flex gap-2">
                    {conditionsModule.conditions.map((condition) => (
                      <li key={condition}>{condition}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-10">
                  <div className="rounded-xl bg-green-50 p-5 ">
                    <h3 className="text-2xl font-medium pb-5 text-green-600">
                      Study ID
                    </h3>
                    <p>{nctId}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="rounded-xl bg-green-50 p-5 ">
                      <h3 className="text-2xl font-medium pb-5 text-green-600">
                        Start date
                      </h3>
                      <p>{toLocaleDate(statusModule.startDateStruct.date)}</p>
                    </div>
                    <div className="rounded-xl bg-green-50 p-5 ">
                      <h3 className="text-2xl font-medium pb-5 text-green-600">
                        Status verified date
                      </h3>
                      <p>{toLocaleDate(statusModule.statusVerifiedDate)}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                    <div className="rounded-xl bg-green-50 p-5 ">
                      <h3 className="text-2xl font-medium pb-5 text-green-600">
                        Completion date
                      </h3>
                      <p>
                        {toLocaleDate(statusModule.completionDateStruct.date)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-green-50 p-5 ">
                      <h3 className="text-2xl font-medium pb-5 text-green-600">
                        Primary completion date
                      </h3>
                      <p>
                        {toLocaleDate(
                          statusModule.primaryCompletionDateStruct.date
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion trigger="More Information">
            <div className="grid grid-cols-3 gap-10">
              <div className="rounded-xl bg-green-50 p-5 ">
                <h3 className="text-2xl font-medium pb-5 text-green-600">
                  Sponsor
                </h3>
                <p>{sponsorCollaboratorsModule.leadSponsor.name}</p>
              </div>
              <div className="rounded-xl bg-green-50 p-5 ">
                <h3 className="text-2xl font-medium pb-5 text-green-600">
                  Last update posted
                </h3>
                <p>
                  {toLocaleDate(statusModule.lastUpdatePostDateStruct.date)}
                </p>
              </div>
              <div className="rounded-xl bg-green-50 p-5 ">
                <h3 className="text-2xl font-medium pb-5 text-green-600">
                  Last verified
                </h3>
                <p>{toLocaleDate(statusModule.statusVerifiedDate)}</p>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

function toLocaleDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
