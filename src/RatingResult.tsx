import React from 'react';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export interface IRatingResultProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value?: number;
  max?: number;
  hideNoRating?: boolean;
}

export default function RatingResult({
  value,
  max = 5,
  hideNoRating = false,
  ...props
}: IRatingResultProps) {
  if (value === undefined) {
    if (hideNoRating) return null;

    return (
      <div aria-label="No rating" style={{ height: 24 + 8 }} {...props}>
        {new Array(max).fill(undefined).map((_, i) => (
          <StarBorderIcon key={i} color="disabled" />
        ))}
      </div>
    );
  }

  return (
    <div aria-label={`${value} stars`} style={{ height: 24 + 8 }} {...props}>
      {new Array(max)
        .fill(undefined)
        .map((_, i) =>
          i < value ? (
            i === Math.floor(value) ? (
              <StarHalfIcon key={i} color="action" />
            ) : (
              <StarIcon key={i} color="action" />
            )
          ) : (
            <StarBorderIcon key={i} color="action" />
          )
        )}
    </div>
  );
}
