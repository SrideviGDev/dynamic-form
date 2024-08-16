import { Validators } from "@angular/forms";

type ValidatorKeys = keyof typeof Validators;

// form-config.ts
type AgeGroup = 'Infant' | 'Child' | 'Teenager' | 'Young Adult' | 'Adult' | 'Senior';

export interface FieldConfig {
  type: 'select' | 'date' | 'number';
  label: string;
  name: string;
  class?: string;
  options?: string[];
  value?: any;
  dependencies?: {
    [key: string]: { [key in AgeGroup]: string }; // Type the dependencies object
  };
  validation?: ValidatorKeys | string; // Assuming you have a ValidatorKeys type for validation keys
}
export const formConfig: FieldConfig[] = [
    {
      type: 'select',
      label: 'Age Group',
      name: 'ageGroup',
      options: ['Infant', 'Child', 'Teenager', 'Young Adult', 'Adult', 'Senior'],
      value: '',
      class: 'age-group-select'
    },
    {
      type: 'select',
      label: 'Age Range',
      name: 'ageRange',
      options: ['0-2 years','3-12 years','13-19 years','20-39 years','40-59 years','60+ years'],
      value: '',
      class: 'age-range-select',
      dependencies: {
        ageGroup: {
          'Infant': '0-2 years',
          'Child': '3-12 years',
          'Teenager': '13-19 years',
          'Young Adult': '20-39 years',
          'Adult': '40-59 years',
          'Senior': '60+ years'
        }
      }
    },
    {
      type: 'date',
      label: 'Start Date',
      name: 'startDate',
      value: '',
      class: 'age-range-select'
    },
    {
      type: 'date',
      label: 'End Date',
      name: 'endDate',
      value: '',
      class: 'end-date-picker'
    },
    {
      type: 'number',
      label: 'Duration (days)',
      name: 'duration',
      value: '',
      validation: 'min',
      class: 'duration-input'
    }
  ];

