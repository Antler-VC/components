import React from 'react';
import { Anchorme } from 'react-anchorme';

import { Link, LinkProps } from '@material-ui/core';

export interface IPlainTextWithLinksProps {
  children?: string;
  LinkProps?: Partial<LinkProps>;
}

export default function PlainTextWithLinks({
  children,
  LinkProps,
}: IPlainTextWithLinksProps) {
  if (!children) return null;

  return (
    <Anchorme
      linkComponent={Link as any}
      target="_blank"
      rel="noopener"
      {...LinkProps}
    >
      {children}
    </Anchorme>
  );
}
