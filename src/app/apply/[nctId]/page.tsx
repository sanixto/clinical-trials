import ApplicationForm from "@/app-components/application-form/ApplicationForm";
import { ApplicationFormValidation } from "@/app-components/application-form/application-schema";
import {
  extractAllCriteria,
  getFullLocationStrings,
  getStudy,
} from "@/studies/studies";

interface ApplyPageProps {
  params: Promise<{ nctId: string }>;
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { nctId } = await params;
  const study = await getStudy(nctId);
  const {
    identificationModule,
    conditionsModule,
    contactsLocationsModule,
    statusModule,
    eligibilityModule,
  } = study.protocolSection;
  const locationStrings = getFullLocationStrings(
    contactsLocationsModule?.locations
  );
  const criterias = extractAllCriteria(eligibilityModule?.eligibilityCriteria);
  const validationData: ApplicationFormValidation = {
    numberOfCritetias: criterias.length,
    minAge: extractNumber(eligibilityModule.minimumAge),
    maxAge: extractNumber(eligibilityModule.maximumAge),
  };

  return (
    <main className="p-28 bg-green-50 flex flex-col gap-10">
      <h2 className="text-4xl text-center font-semibold">
        {identificationModule.briefTitle}
      </h2>
      <div className="bg-white p-10 w-full rounded-xl">
        <ApplicationForm
          nctId={nctId}
          conditions={conditionsModule.conditions}
          locations={locationStrings}
          status={statusModule.overallStatus}
          criterias={criterias}
          validationData={validationData}
        />
      </div>
    </main>
  );
}

function extractNumber(value?: string): number | undefined {
  const match = value?.match(/\d+/);
  return match ? Number(match[0]) : undefined;
}
