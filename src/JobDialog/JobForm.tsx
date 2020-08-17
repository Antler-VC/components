import React from 'react';

import { Typography } from '@material-ui/core';

import Form, {
  IFormProps,
  FIELDS,
  Values,
} from '@antlerengineering/form-builder';
import * as yup from 'yup';
import { generateId } from '../utils';

import { IJobDialogProps } from './JobDialog';

const jobApplicationForm = (id: string) => [
  {
    type: FIELDS.heading,
    text: 'Personal Details',
  },
  {
    name: 'email',
    type: FIELDS.text,
    fieldVariant: 'email',
    label: 'Email Address',
    validation: yup
      .string()
      .email('Must be a valid email')
      .required('Required'),
    autoFocus: true,
  },
  {
    name: 'fullName',
    type: FIELDS.text,
    label: 'Full Name',
    validation: yup.string().required('Required'),
  },
  {
    name: 'location',
    type: FIELDS.text,
    label: 'Where are you based? (City, Country)',
    validation: yup.string().required('Required'),
  },
  {
    name: 'linkedin',
    type: FIELDS.text,
    fieldVariant: 'url',
    label: 'LinkedIn URL',
    validation: yup
      .string()
      .url('Must be a valid URL')
      .required('Required'),
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
    type: FIELDS.text,
    fieldVariant: 'long',
    label: 'Cover Letter (max. 1500 characters)',
    validation: yup
      .string()
      .max(1500, 'Must be less than or equal to 1500 characters')
      .required('Required'),
  },
  {
    type: FIELDS.description,
    description: (
      <Typography variant="body2">
        A copy of your responses will be emailed to the address you provided.
      </Typography>
    ),
  },
];
const jobApplicationFormWithPortfolio = (id: string) => [
  {
    type: FIELDS.heading,
    text: 'Personal Details',
  },
  {
    name: 'email',
    type: FIELDS.text,
    fieldVariant: 'email',
    label: 'Email Address',
    validation: yup
      .string()
      .email('Must be a valid email')
      .required('Required'),
    autoFocus: true,
  },
  {
    name: 'fullName',
    type: FIELDS.text,
    label: 'Full Name',
    validation: yup.string().required('Required'),
  },
  {
    name: 'location',
    type: FIELDS.text,
    label: 'Where are you based? (City, Country)',
    validation: yup.string().required('Required'),
  },
  {
    name: 'linkedin',
    type: FIELDS.text,
    fieldVariant: 'url',
    label: 'LinkedIn URL',
    validation: yup
      .string()
      .url('Must be a valid URL')
      .required('Required'),
  },
  {
    name: 'portfolio',
    type: FIELDS.text,
    label: 'Portfolio link (e.g. GitHub link)',
    validation: yup.string().url('Must be a valid URL'),
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
    type: FIELDS.text,
    fieldVariant: 'long',
    label: 'Cover Letter (max. 1500 characters)',
    validation: yup
      .string()
      .max(1500, 'Must be less than or equal to 1500 characters')
      .required('Required'),
  },
  {
    type: FIELDS.description,
    description: (
      <Typography variant="body2">
        A copy of your responses will be emailed to the address you provided.
      </Typography>
    ),
  },
];
const jobApplicationExternalForm = [
  {
    type: FIELDS.heading,
    text: 'Personal Details',
  },
  {
    name: 'email',
    type: FIELDS.text,
    fieldVariant: 'email',
    label: 'Email Address',
    validation: yup
      .string()
      .email('Must be a valid email')
      .required('Required'),
    autoFocus: true,
  },
  {
    name: 'fullName',
    type: FIELDS.text,
    label: 'Full Name',
    validation: yup.string().required('Required'),
  },
  {
    name: 'linkedin',
    type: FIELDS.text,
    fieldVariant: 'url',
    label: 'LinkedIn URL',
    validation: yup
      .string()
      .url('Must be a valid URL')
      .required('Required'),
  },
  {
    name: 'antlerNetwork',
    type: FIELDS.checkbox,
    label: 'Connect me with Antler Network',
    validation: yup.boolean(),
  },
  {
    type: FIELDS.description,
    description: (
      <Typography variant="body2">
        You will be redirected to an external site where you can apply.
      </Typography>
    ),
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
  );
}
