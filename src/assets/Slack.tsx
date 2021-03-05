import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export default function Slack(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fill="#E01E5A"
        d="M9 13a2 2 0 012 2v5a2 2 0 11-4 0v-5a2 2 0 012-2zm-3 0v2a2 2 0 11-2-2h2z"
      />
      <path
        fill="#36C5F0"
        d="M9 8a2 2 0 110 4H4a2 2 0 110-4h5zm0-5a2 2 0 012 2v2H9a2 2 0 110-4z"
      />
      <path
        fill="#2EB67D"
        d="M19 8a2 2 0 110 4h-2v-2a2 2 0 012-2zm-5-5a2 2 0 012 2v5a2 2 0 11-4 0V5a2 2 0 012-2z"
      />
      <path
        fill="#ECB22E"
        d="M14 18a2 2 0 11-2 2v-2h2zm5-5a2 2 0 110 4h-5a2 2 0 110-4h5z"
      />
    </SvgIcon>
  );
}
