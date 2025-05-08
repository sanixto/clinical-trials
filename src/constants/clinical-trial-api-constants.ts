export const apiUrl = "https://clinicaltrials.gov/api/v2";

export const apiEndpoints = {
  studies: "/studies",
} as const;

export const apiParams = {
  fields: "fields",
  query: "query",
  condition: "query.cond",
  location: "query.locn",
  patient: "query.patient",
  aggFilters: "aggFilters",
  allowedForHealthy: "healthy:y",
} as const;
