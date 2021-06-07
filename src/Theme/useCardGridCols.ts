import { useMediaQuery } from '@material-ui/core';

export default function useCardGridCols(max: number = 4) {
  const isMounted = useMediaQuery('(min-width: 0)');

  const isXs = useMediaQuery((theme) => (theme as any).breakpoints.down('xs'));
  const isSm = useMediaQuery((theme) => (theme as any).breakpoints.down('sm'));
  const isMd = useMediaQuery((theme) => (theme as any).breakpoints.down('md'));

  if (!isMounted) return 0;

  return Math.min(max, isXs ? 1 : isSm ? 2 : isMd ? 3 : 4);
}
