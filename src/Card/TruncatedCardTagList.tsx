import React from 'react';

import CardTagList, { ICardTagListProps } from './CardTagList';

export const TRUNCATED_TAGS_LENGTH = 3;

export interface ITruncatedCardTagListProps extends ICardTagListProps {
  expanded: boolean;
}

export default function TruncatedCardTagList({
  expanded,
  name,
  tags = [],
  ...props
}: ITruncatedCardTagListProps) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  let renderedTags: typeof tags = [];
  if (expanded || tags.length <= TRUNCATED_TAGS_LENGTH) renderedTags = tags;
  else if (tags.length > 3)
    renderedTags = [
      ...tags.slice(0, TRUNCATED_TAGS_LENGTH),
      `+${tags.length - TRUNCATED_TAGS_LENGTH}`,
    ];

  return <CardTagList name={name} tags={renderedTags} {...props} />;
}
