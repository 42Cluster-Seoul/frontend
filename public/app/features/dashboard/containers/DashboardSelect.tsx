import { css, cx } from '@emotion/css';
import React, { useState, useEffect } from 'react';
import { mediaQueryStyles } from 'style/mediaQuery';

import { GrafanaTheme2 } from '@grafana/data';
import { reportInteraction } from '@grafana/runtime';
import { Menu, Dropdown, useStyles2, ToolbarButton, Icon } from '@grafana/ui';
import { useDashboardList } from 'app/features/browse-dashboards/state';

import { GitHubButtonStyles } from '../../../../style/GitHubButtonStyles';
import { getDashboardUidFromUrl, variableQueryString } from '../utils/42cluster';
import { useTemplateVariable } from '../utils/useTemplateVariable';

const DashboardSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const gitHubButtonStyles = useStyles2(GitHubButtonStyles);
  const styles = useStyles2(getStyles);
  const mqstyles = useStyles2(mediaQueryStyles);
  const uid: string | undefined = getDashboardUidFromUrl();
  const dashboardList = useDashboardList()?.filter((v) => v.uid.startsWith(uid?.[0]));
  const [variable] = useTemplateVariable();
  const [createActions, setCreateActions] = useState<any>([]);

  if (dashboardList === undefined) {
    return;
  }

  const currDashboard = dashboardList.find((v) => v.uid === uid);

  const handleNavigate = (createAction: any) => () => {
    //   const target = e.target as HTMLButtonElement;
    reportInteraction('grafana_menu_item_clicked', { url: createAction.url, from: 'quickadd' });
    //   setCurrDashboard(target.textContent === null ? '' : target.textContent);
  };

  useEffect(() => {
    setCreateActions(
      dashboardList.map((dashboard) => ({
        id: dashboard.uid,
        text: dashboard.title,
        icon: 'plus',
        url: `/d/${dashboard.uid}`,
        hideFromTabs: true,
        isCreateAction: true,
      }))
    );
  }, [variable, isOpen]);

  const MenuActions = () => {
    return (
      <Menu>
        {createActions.map((createAction, index) => (
          <Menu.Item
            key={index}
            url={createAction.url}
            label={createAction.text}
            disabled={currDashboard?.title === createAction.text}
            checkType={true}
            isChecked={currDashboard?.title === createAction.text}
            onClick={handleNavigate(createAction)}
          />
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={MenuActions} placement="bottom-start" onVisibleChange={setIsOpen}>
      <div className={styles.select}>
        <ToolbarButton
          isOpen={isOpen}
          className={cx(gitHubButtonStyles.button, gitHubButtonStyles.greenButton)}
          aria-label="New"
        >
          <div className={styles.ellipsis}>
            <div>
              <Icon name="horizontal-align-left" />
            </div>
            <div className={cx(styles.text, mqstyles.hideBelowSmall)}>{currDashboard?.title}</div>
          </div>
        </ToolbarButton>
      </div>
    </Dropdown>
  );
};

const getStyles = (theme: GrafanaTheme2) => ({
  buttonContent: css({
    alignItems: 'center',
    display: 'flex',
  }),
  buttonText: css({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  }),
  select: css({ margin: '0px 8px 10px 0px' }),
  ellipsis: css({
    display: 'flex',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  // button: css({ maxWidth: '200px' }),
  text: css({
    paddingLeft: '10px',
  }),
});

export default DashboardSelect;
