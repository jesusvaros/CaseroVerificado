// No need to import ReactNode here as it's not used in this file

export interface FormContextType {
  address: string;
  setAddress: (address: string) => void;
  formData: FormDataType;
  updateFormData: (data: Partial<FormDataType>) => void;
  resetForm: () => void;
}

export type Score = 1 | 2 | 3 | 4 | 5;

// 'ongoing' means the tenant still lives there, so there is no deposit outcome yet
export type DepositReturned = 'true' | 'partial' | 'false' | 'ongoing';

export type FormDataType = {
  addressDetails?: {
    street?: string;
    number?: string;
    floor?: string;
    door?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    fullAddress?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    components?: {
      road?: string;
      house_number?: string;
      city?: string;
      town?: string;
      village?: string;
      postcode?: string;
      state?: string;
      [key: string]: string | undefined;
    };
  };

  startYear?: number;
  // null = still living there
  endYear?: number | null;
  price?: number;
  depositReturned?: DepositReturned;

  ownerScore?: Score;
  propertyScore?: Score;
  buildingScore?: Score;
  areaScore?: Score;
  opinion?: string;
  tags?: import('../components/review-form/reviewTags').ReviewTag[];

  // Contact Information (Modal)
  contactName?: string;
  contactEmail?: string;
  addressAutocompleteResult?: import('../components/ui/AddressAutocomplete').AddressResult;
};

export const initialFormData: FormDataType = {
  addressDetails: {
    street: '',
    number: '',
    floor: '',
    door: '',
    city: '',
    postalCode: '',
  },
  startYear: undefined,
  endYear: undefined,
  price: undefined,
  depositReturned: undefined,
  ownerScore: undefined,
  propertyScore: undefined,
  buildingScore: undefined,
  areaScore: undefined,
  opinion: '',
  tags: [],
  contactName: '',
  contactEmail: '',
};
