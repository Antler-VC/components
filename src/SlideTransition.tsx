import React from 'react';

import { useTheme } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

export const SlideTransition = React.forwardRef(
  ({ children, ...props }: TransitionProps, ref: React.Ref<any>) => {
    const theme = useTheme();

    if (!children) return null;

    const defaultStyle = {
      opacity: 0,
      transform: 'translateY(20px)',

      transition: theme.transitions.create(['transform', 'opacity'], {
        duration: '400ms',
        easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      }),
    };

    const transitionStyles = {
      entering: {
        willChange: 'transform, opacity',
      },

      entered: {
        opacity: 1,
        transform: 'none',
      },

      exiting: {
        opacity: 0,
        transform: 'none',

        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.leavingScreen,
        }),
      },

      exited: {
        opacity: 0,
        transform: 'none',
        transition: 'none',
      },

      unmounted: {},
    };

    return (
      <Transition
        appear
        timeout={{ enter: 0, exit: theme.transitions.duration.leavingScreen }}
        {...props}
      >
        {state =>
          React.cloneElement(children as any, {
            style: { ...defaultStyle, ...transitionStyles[state] },
            ref,
          })
        }
      </Transition>
    );
  }
);

export default SlideTransition;
