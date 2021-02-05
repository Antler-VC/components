import React from 'react';

import { Typography } from '@material-ui/core';

export interface ICardBodyProps {
  body: React.ReactNode;
}

export default function CardBody({ body }: ICardBodyProps) {
  if (!body) return null;

  if (typeof body === 'string')
    return <Typography variant="body2">{body}</Typography>;

  return body as JSX.Element;
}
