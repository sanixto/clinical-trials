export interface Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      orgStudyIdInfo: {
        id: string;
      };
      secondaryIdInfos?: {
        id: string;
        type?: string;
        domain?: string;
      }[];
      organization: {
        fullName: string;
        class: string;
      };
      briefTitle: string;
      officialTitle: string;
    };
    statusModule: {
      statusVerifiedDate: string;
      overallStatus: string;
      expandedAccessInfo?: {
        hasExpandedAccess: boolean;
      };
      startDateStruct: {
        date: string;
      };
      primaryCompletionDateStruct: {
        date: string;
        type: string;
      };
      completionDateStruct: {
        date: string;
        type: string;
      };
      studyFirstSubmitDate: string;
      studyFirstSubmitQcDate: string;
      studyFirstPostDateStruct: {
        date: string;
        type: string;
      };
      lastUpdateSubmitDate: string;
      lastUpdatePostDateStruct: {
        date: string;
        type: string;
      };
    };
    sponsorCollaboratorsModule: {
      responsibleParty: {
        type: string;
      };
      leadSponsor: {
        name: string;
        class: string;
      };
      collaborators?: {
        name: string;
        class: string;
      }[];
    };
    descriptionModule: {
      briefSummary: string;
      detailedDescription: string;
    };
    conditionsModule: {
      conditions: string[];
      keywords?: string[];
    };
    designModule: {
      studyType: string;
      phases?: string[];
      designInfo: {
        primaryPurpose: string;
        maskingInfo: {
          masking: string;
        };
      };
    };
    armsInterventionsModule?: {
      interventions: {
        type: string;
        name: string;
      }[];
    };
    outcomesModule?: {
      primaryOutcomes?: {
        measure: string;
      }[];
      secondaryOutcomes?: {
        measure: string;
      }[];
    };
    eligibilityModule: {
      eligibilityCriteria: string;
      healthyVolunteers: boolean;
      sex: string;
      minimumAge?: string;
      maximumAge?: string;
      stdAges: string[];
    };
    contactsLocationsModule: {
      overallOfficials: {
        name: string;
        affiliation: string;
        role: string;
      }[];
      locations: {
        facility: string;
        city: string;
        state: string;
        zip: string;
        country: string;
        geoPoint?: {
          lat: number;
          lon: number;
        };
      }[];
    };
  };
}

export interface StudiesResponse {
  studies: Study[];
}
