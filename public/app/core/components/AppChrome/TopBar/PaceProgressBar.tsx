import { css, cx } from '@emotion/css';
import React, { useEffect } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2 } from '@grafana/ui';
import { useSelector, useDispatch } from 'app/types';

import { paceProgressBarComplete, paceProgressBarInactive } from '../../../../features/paceProgressBar/state/reducers';

const PaceProgressBar = () => {
  const styles = useStyles2(getStyles);
  const paceState = useSelector((state) => state.paceProgressBar);
  const dispatch = useDispatch();

  console.log(paceState, document.readyState);

  // dropdown 메뉴를 선택하면, 아예 페이지 자체가 새로고침
  // Link 컴포넌트를 선택하면, 페이지가 새로고침되지 않고 이동됨

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const intervalId = setInterval(() => {
      if (document.readyState === 'complete') {
        dispatch(paceProgressBarComplete());
        clearInterval(intervalId);
        timeoutId = setTimeout(() => {
          dispatch(paceProgressBarInactive());
        }, 150);
      }
    }, 300);

    return () => {
      clearInterval(intervalId);
      clearInterval(timeoutId);
    };
  }, [dispatch, paceState.count]);

  let currClass;
  if (paceState.status === 'interactive') {
    currClass = styles.state.interative;
  } else if (paceState.status === 'complete') {
    currClass = styles.state.complete;
  } else if (paceState.status === 'inactive') {
    currClass = styles.state.inactive;
  }

  return <div className={cx(styles.pgbar, currClass)} />;
};

const getStyles = (theme: GrafanaTheme2) => {
  return {
    pgbar: css({
      width: '0%',
      height: '4px',
      backgroundColor: '#6495ED',
      transition: 'width 0.25s ease, opacity 0.5s ease',
    }),
    state: {
      complete: css({ width: '100%', opacity: '0' }),
      interative: css({ width: '10%' }),
      inactive: css({ width: '0%', transition: 'none' }),
    },
  };
};

export default PaceProgressBar;
