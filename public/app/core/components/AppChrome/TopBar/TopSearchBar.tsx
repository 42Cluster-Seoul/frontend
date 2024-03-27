import { css } from '@emotion/css';
// import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { GrafanaTheme2, locationUtil, textUtil } from '@grafana/data';
import { Dropdown, ToolbarButton, useStyles2 } from '@grafana/ui';
import { config } from 'app/core/config';
import { contextSrv } from 'app/core/core';
import { fourtyTwoClusterBackendFetching } from 'app/features/fourtyTwoClusterBackend/state/reducers';
import { useSelector, useDispatch } from 'app/types';

import { Branding } from '../../Branding/Branding';
// import { enrichHelpItem } from '../MegaMenu/utils';
// import { NewsContainer } from '../News/NewsContainer';
import { OrganizationSwitcher } from '../OrganizationSwitcher/OrganizationSwitcher';
import { QuickAdd } from '../QuickAdd/QuickAdd';
import { TOP_BAR_LEVEL_HEIGHT } from '../types';

import { SignInLink } from './SignInLink';
import { TopNavBarMenu } from './TopNavBarMenu';
import { TopSearchBarCommandPaletteTrigger } from './TopSearchBarCommandPaletteTrigger';
import { TopSearchBarSection } from './TopSearchBarSection';

export const TopSearchBar = React.memo(function TopSearchBar() {
  const styles = useStyles2(getStyles);
  const navIndex = useSelector((state) => state.navIndex);
  const backendState = useSelector((state) => state.fourtyTwoClusterBackend);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        fourtyTwoClusterBackendFetching({
          serviceId: 0,
          serviceName: '42 Morning glory',
          dashboardUID: 'a87fb0d919ec0ea5f6543124e16c42a5',
        })
      );
    }, 500);
  }, [dispatch]);

  // const helpNode = cloneDeep(navIndex['help']);
  // const enrichedHelpNode = helpNode ? enrichHelpItem(helpNode) : undefined;
  const profileNode = navIndex['profile'];

  let homeUrl = config.appSubUrl || '/';
  if (!config.bootData.user.isSignedIn && !config.anonymousEnabled) {
    homeUrl = textUtil.sanitizeUrl(locationUtil.getUrlForPartial(location, { forceLogin: 'true' }));
  }

  return (
    <div className={styles.layout}>
      <TopSearchBarSection>
        <a className={styles.logo} href={homeUrl} title="Go to home">
          <Branding.MenuLogo className={styles.img} />
        </a>
        {backendState.isValid ? (
          <a className={styles.logo} href={homeUrl} title="Go to home">
            <div className={styles.serviceName}>
              <b>{backendState.serviceName}</b>
            </div>
          </a>
        ) : (
          <span>loading...</span>
        )}
        <OrganizationSwitcher />
      </TopSearchBarSection>

      <TopSearchBarSection align="right">
        <TopSearchBarCommandPaletteTrigger />
        <QuickAdd />
        {/* {enrichedHelpNode && (
          <Dropdown overlay={() => <TopNavBarMenu node={enrichedHelpNode} />} placement="bottom-end">
            <ToolbarButton iconOnly icon="question-circle" aria-label="Help" />
          </Dropdown>
        )} */}
        {/* {config.newsFeedEnabled && <NewsContainer />} */}
        {!contextSrv.user.isSignedIn && <SignInLink />}
        {profileNode && (
          <Dropdown overlay={() => <TopNavBarMenu node={profileNode} />} placement="bottom-end">
            <ToolbarButton
              className={styles.profileButton}
              imgSrc={contextSrv.user.gravatarUrl}
              imgAlt="User avatar"
              aria-label="Profile"
            />
          </Dropdown>
        )}
      </TopSearchBarSection>
    </div>
  );
});

const getStyles = (theme: GrafanaTheme2) => ({
  layout: css({
    height: TOP_BAR_LEVEL_HEIGHT,
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    padding: theme.spacing(0, 1, 0, 2),
    margin: theme.spacing(1, 1, 1, 1),
    // borderBottom: `1px solid ${theme.colors.border.weak}`,
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 2fr', // search should not be smaller than 240px
      display: 'grid',

      justifyContent: 'flex-start',
    },
  }),
  img: css({
    height: theme.spacing(3),
    width: theme.spacing(3),
  }),
  logo: css({
    display: 'flex',
    gap: theme.spacing(1.5),
  }),
  profileButton: css({
    padding: theme.spacing(0, 0.25),
    img: {
      borderRadius: theme.shape.radius.circle,
      height: '30px',
      marginRight: 0,
      width: '30px',
    },
  }),
  serviceName: css({
    width: '100%',
    minWidth: '50px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
});
