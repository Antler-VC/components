import React from 'react';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

/** Right chevron icon with optical alignment */
const GoIcon: React.FunctionComponent<SvgIconProps> = props => (
  <ChevronRightIcon style={{ marginLeft: '-0.33em' }} {...props} />
);

export default GoIcon;
