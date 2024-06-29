import { css } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { useStyles2, useTheme2 } from '@grafana/ui';

export interface Props {
  /**
   * Defaults to Page
   */
  entity?: string;
}

export function EntityNotFound({ entity = 'Page' }: Props) {
  const styles = useStyles2(getStyles);
  const theme = useTheme2();

  // 사진 변경
  return (
    <div className={styles.container}>
      <h1>{entity} not found</h1>
      <div className={styles.subtitle}>We&apos;re looking but can&apos;t seem to find this {entity.toLowerCase()}.</div>
      <div className={styles.grot}>
        <img src={`public/img/grot-404-${theme.isDark ? 'dark' : 'light'}.svg`} width="100%" alt="grot" />
      </div>
    </div>
  );
}

export function getStyles(theme: GrafanaTheme2) {
  return {
    container: css({
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(8, 2, 2, 2),
      h1: {
        textAlign: 'center',
      },
    }),
    subtitle: css({
      color: theme.colors.text.secondary,
      fontSize: theme.typography.h5.fontSize,
      padding: theme.spacing(2, 0),
      textAlign: 'center',
    }),
    grot: css({
      maxWidth: '450px',
      paddingTop: theme.spacing(8),
      margin: '0 auto',
    }),
  };
}
