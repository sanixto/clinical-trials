import Filter from "@/app-components/filter/Filter";
import StudyCard from "@/app-components/study-card/StudyCard";
import { getStudies, getUniqueLocationStrings } from "@/studies/studies";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { city, state, condition, age, afhv } = await searchParams;
  const studies = await getStudies(city, state, condition, age, afhv);

  return (
    <main className="p-5 lg:p-10 lg:flex bg-green-50 gap-10">
      <div className="lg:flex-2 w-full h-fit bg-white border-2 border-green-200 rounded-xl">
        <Filter />
      </div>
      <div className="lg:flex-5 grid grid-cols-1 2xl:grid-cols-2 gap-10">
        {studies.map((study) => {
          const {
            statusModule,
            sponsorCollaboratorsModule,
            identificationModule,
            contactsLocationsModule,
            conditionsModule,
          } = study.protocolSection;
          const locations = getUniqueLocationStrings(
            contactsLocationsModule?.locations
          );

          return (
            <StudyCard
              key={identificationModule.briefTitle}
              title={identificationModule.briefTitle}
              status={statusModule.overallStatus}
              sponsor={sponsorCollaboratorsModule.leadSponsor.name}
              locations={locations}
              code={identificationModule.nctId}
              conditions={conditionsModule.conditions}
            />
          );
        })}
      </div>
    </main>
  );
}
