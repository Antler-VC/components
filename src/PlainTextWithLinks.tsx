import React from 'react';

import { Link, LinkProps } from '@material-ui/core';

export interface IPlainTextWithLinksProps {
  children?: string;
  LinkProps?: Partial<LinkProps>;
}

export default function PlainTextWithLinks({
  children,
  LinkProps,
}: IPlainTextWithLinksProps) {
  const re = /(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]+\S*)/;

  const split = children?.split(re) ?? [];

  return (
    <>
      {split.map(item =>
        re.test(item) ? (
          <Link href={item} target="_blank" rel="noopener" {...LinkProps}>
            {item}
          </Link>
        ) : (
          item
        )
      )}
    </>
  );
}
