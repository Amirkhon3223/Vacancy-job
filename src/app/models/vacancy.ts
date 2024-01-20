export interface Vacancy {
  id: number;
  title: string;
  date: string;
  type: string;
  region: string;
  city: string;
  employmentType: string;
  description: string;
}


export interface FilterData {
  selectedCity?: string;
  selectedVacancyType?: string;
  searchText?: string;
}
