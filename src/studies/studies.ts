import { apiGet } from "@/api/api";
import { StudiesResponse, Study } from "@/studies/study.interface";
import {
  apiEndpoints,
  apiParams,
  apiUrl,
} from "@/constants/clinical-trial-api-constants";

export async function getStudies(
  city?: string,
  state?: string,
  condition?: string,
  age?: string,
  afhv?: string
) {
  const fieldNames = [
    "NCTId",
    "BriefTitle",
    "OverallStatus",
    "LeadSponsorName",
    "LocationCity",
    "LocationState",
    "ConditionsModule",
  ];
  const params = new URLSearchParams();
  const locationParts = [city, state].filter(Boolean);
  const setParamIfExist = (paramName: string, param?: string) =>
    param && params.set(paramName, param);

  setParamIfExist(apiParams.fields, fieldNames.join("|"));
  setParamIfExist(apiParams.location, locationParts.join("&&"));
  setParamIfExist(apiParams.condition, condition);
  setParamIfExist(apiParams.patient, age);

  if (afhv === "true") {
    params.set(apiParams.aggFilters, apiParams.allowedForHealthy);
  }

  const data = await apiGet<StudiesResponse>(
    `${apiUrl}${apiEndpoints.studies}`,
    params
  );

  return data.studies;
}

export async function getStudy(studyId: string) {
  const filedNames = [
    "NCTId",
    "BriefTitle",
    "StatusModule",
    "LeadSponsorName",
    "LocationCity",
    "LocationState",
    "ConditionsModule",
    "DescriptionModule",
    "EligibilityModule",
  ];
  const params = new URLSearchParams({
    [apiParams.fields]: filedNames.join("|"),
  });

  const data = await apiGet<Study>(
    `${apiUrl}${apiEndpoints.studies}/${studyId}`,
    params
  );

  return data;
}

export function getFullLocationStrings(
  locations: {
    city: string;
    state: string;
    country: string;
    zip: string;
  }[] = []
) {
  const locationStrings = locations?.map((location) =>
    [location.city, location.state, location.country, location.zip]
      .filter((v) => !!v)
      .join(",")
  );

  return Array.from(new Set(locationStrings));
}

export function getUniqueLocationStrings(
  locations: { city: string; state: string }[] = []
) {
  const locationStrings = locations?.map((location) =>
    [location.city, location.state].filter((v) => !!v).join(",")
  );

  return Array.from(new Set(locationStrings));
}

export function extractAllCriteria(text: string): string[] {
  const [inclusionBlock, exclusionBlock] = text
    .split(/Exclusion Criteria:/i)
    .map((part) => part.trim());

  const inclusionText = inclusionBlock
    .replace(/^Inclusion Criteria:/i, "")
    .trim();

  const inclusion = inclusionText
    .split(/\n\* ?/)
    .map((s) => s.trim())
    .filter(Boolean);

  const exclusion = exclusionBlock
    .split(/\n\d+\.\s?/)
    .map((s) => s.trim())
    .filter(Boolean);

  return [...inclusion, ...exclusion];
}
