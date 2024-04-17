import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { locationUtil, textUtil } from '@grafana/data';

import {
  paceProgressBarInteractive,
  paceProgressBarCountUp,
} from '../../../../../public/app/features/paceProgressBar/state/reducers';
import { useDispatch } from '../../../../../public/app/types';

export interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * @alpha
 */
export const Link = forwardRef<HTMLAnchorElement, Props>(({ href, children, ...rest }, ref) => {
  const validUrl = locationUtil.stripBaseFromUrl(textUtil.sanitizeUrl(href ?? ''));
  const dispatch = useDispatch();

  return (
    <RouterLink
      ref={ref}
      to={validUrl}
      {...rest}
      onClick={() => {
        dispatch(paceProgressBarInteractive());
        dispatch(paceProgressBarCountUp());
      }}
    >
      {children}
    </RouterLink>
  );
});

Link.displayName = 'Link';
