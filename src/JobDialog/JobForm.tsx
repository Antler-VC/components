import React from 'react';

import {
  Form,
  IFormProps,
  FieldType,
  Values,
} from '@antlerengineering/form-builder';

import { generateId } from '../utils';

import { IJobDialogProps } from './JobDialog';

const jobApplicationForm = (id: string) => [
  {
    type: FieldType.contentHeader,
    label: 'Personal Details',
  },
  {
    name: 'email',
    type: FieldType.shortText,
    format: 'email',
    label: 'Email Address',
    required: true,
    autoFocus: true,
  },
  {
    name: 'fullName',
    type: FieldType.shortText,
    label: 'Full Name',
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'location',
    type: FieldType.shortText,
    label: 'Where are you based? (City, Country)',
    required: true,
    autoComplete: 'country-name',
  },
  {
    name: 'linkedin',
    type: FieldType.shortText,
    format: 'linkedin',
    label: 'LinkedIn URL',
    required: true,
  },
  {
    name: 'cv',
    type: 'file',
    label: 'CV/Résumé',
    docRef: `jobApplications/${id}`,
    multiple: false,
    mimeTypes: 'application/pdf',
  },
  {
    name: 'coverLetter',
    type: FieldType.paragraph,
    label: 'Cover Letter',
    maxCharacters: 1500,
    required: true,
  },
  {
    type: FieldType.contentParagraph,
    label:
      'A copy of your responses will be emailed to the address you provided.',
  },
];

const jobApplicationFormWithPortfolio = (id: string) => [
  {
    type: FieldType.contentHeader,
    label: 'Personal Details',
  },
  {
    name: 'email',
    type: FieldType.shortText,
    format: 'email',
    label: 'Email Address',
    required: true,
    autoFocus: true,
  },
  {
    name: 'fullName',
    type: FieldType.shortText,
    label: 'Full Name',
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'location',
    type: FieldType.shortText,
    label: 'Where are you based? (City, Country)',
    required: true,
    autoComplete: 'country-name',
  },
  {
    name: 'linkedin',
    type: FieldType.shortText,
    format: 'linkedin',
    label: 'LinkedIn URL',
    required: true,
  },
  {
    name: 'portfolio',
    type: FieldType.shortText,
    label: 'Portfolio link (e.g. GitHub link)',
    format: 'url',
  },
  {
    name: 'cv',
    type: 'file',
    label: 'CV/Résumé',
    docRef: `jobApplications/${id}`,
    multiple: false,
    mimeTypes: 'application/pdf',
  },
  {
    name: 'coverLetter',
    type: FieldType.paragraph,
    label: 'Cover Letter',
    maxCharacters: 1500,
    required: true,
  },
  {
    type: FieldType.paragraph,
    label:
      'A copy of your responses will be emailed to the address you provided.',
  },
];
const jobApplicationExternalForm = [
  {
    type: FieldType.contentHeader,
    text: 'Personal Details',
  },
  {
    name: 'email',
    type: FieldType.shortText,
    format: 'email',
    label: 'Email Address',
    required: true,
    autoFocus: true,
  },
  {
    name: 'fullName',
    type: FieldType.shortText,
    label: 'Full Name',
    required: true,
    autoComplete: 'name',
  },
  {
    name: 'linkedin',
    type: FieldType.shortText,
    format: 'linkedin',
    label: 'LinkedIn URL',
    required: true,
  },
  {
    name: 'antlerNetwork',
    type: FieldType.checkbox,
    label: 'Connect me with Antler Network',
  },
  {
    type: FieldType.paragraph,
    label: 'You will be redirected to an external site where you can apply.',
  },
];

export interface IJobFormProps {
  data: IJobDialogProps['data'];
  FormProps: Partial<IFormProps>;
}

export default function JobForm({
  data: { externalJobAd, externalJobAdLink, portfolioLink },
  FormProps,
}: IJobFormProps) {
  const isExternal = externalJobAd && externalJobAdLink;

  const handleSubmit = async (data: Values) => {
    if (FormProps.onSubmit) await FormProps.onSubmit(data);
    if (isExternal) window.open(externalJobAdLink as string);
  };

  return (
    <div style={{ marginTop: -36 }}>
      <Form
        {...FormProps}
        fields={
          isExternal
            ? jobApplicationExternalForm
            : portfolioLink
            ? jobApplicationFormWithPortfolio(generateId(20))
            : jobApplicationForm(generateId(20))
        }
        onSubmit={handleSubmit}
      />
    </div>
  );
}
