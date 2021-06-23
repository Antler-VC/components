import React from 'react';

import { IconButton } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

export interface ISocialButtonsProps {
  linkedin?: string;
  twitter?: string;
  className?: string;
}

export default function SocialButtons({
  linkedin,
  twitter,
  className,
}: ISocialButtonsProps) {
  return (
    <div className={className}>
      {linkedin && (
        <IconButton
          color="secondary"
          aria-label="LinkedIn"
          component="a"
          href={(!linkedin.startsWith('http') ? '//' : '') + linkedin}
          target="_blank"
          rel="noopener"
          onClick={(e: any) => e.stopPropagation()}
        >
          <LinkedInIcon />
        </IconButton>
      )}
      {twitter && (
        <IconButton
          color="secondary"
          aria-label="Twitter"
          component="a"
          href={
            twitter.match(/^https?:\/\//)
              ? twitter
              : 'https://twitter.com/' + twitter.replace('@', '')
          }
          target="_blank"
          rel="noopener"
          onClick={(e: any) => e.stopPropagation()}
        >
          <TwitterIcon />
        </IconButton>
      )}
    </div>
  );
}
