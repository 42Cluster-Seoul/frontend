import { css, cx } from '@emotion/css';
import React, { useState } from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { VariableOption } from '@grafana/data/src/types/templateVars';
import { reportInteraction } from '@grafana/runtime';
import { Menu, Dropdown, useStyles2, ToolbarButton, Icon } from '@grafana/ui';
import { useDashboardList } from 'app/features/browse-dashboards/state';

import { GitHubButtonStyles } from '../../../../style/GitHubButtonStyles';

interface Props {
  // picker: OptionsPickerState;
  options: VariableOption[];
}

const OptionDropdown = ({ options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const gitHubButtonStyles = useStyles2(GitHubButtonStyles);
  const styles = useStyles2(getStyles);

  const dashboardList = useDashboardList();
  const isValid = dashboardList !== undefined;
  const subCaterogyName = function (title: string | null) {
    switch (title) {
      default:
        return 'namespace';
    }
  };

  // 1. 현재 대시보드 uid 가져오기
  const currDashboard =
    isValid && dashboardList.length
      ? dashboardList.filter((v) => v.uid === window.location.pathname.split('/')[2])[0]
      : { kind: '', uid: '', title: '', url: '' };

  const createActions = options.map((option, index) => ({
    id: index,
    text: option.text as string, // can't be string[] due to disabled multi-select
    icon: 'plus',
    url: `/d/${currDashboard.uid}/${currDashboard.title}?var-${subCaterogyName(currDashboard.title)}=${option.text}`,
    hideFromTabs: true,
    isCreateAction: true,
  }));
  // 2. 현재 체크된 것 가져오기
  const currSubCategory = options.filter((v) => v.selected === true)[0].text;

  const MenuActions = () => {
    return (
      <Menu>
        {createActions.map((createAction, index) => (
          <Menu.Item
            key={index}
            url={createAction.url}
            label={createAction.text}
            checkType={true}
            isChecked={currSubCategory === createAction.text}
            onClick={() => {
              //   const target = e.target as HTMLButtonElement;
              reportInteraction('grafana_menu_item_clicked', { url: createAction.url, from: 'quickadd' });
              //   setCurrDashboard(target.textContent === null ? '' : target.textContent);
            }}
          />
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={MenuActions} placement="bottom-start" onVisibleChange={setIsOpen}>
      <ToolbarButton
        isOpen={isOpen}
        className={cx(gitHubButtonStyles.button, gitHubButtonStyles.greenButton, styles.button)}
        aria-label="New"
      >
        <div className={styles.ellipsis}>
          <div>
            <Icon name="filter" />
          </div>
          <div className={styles.text}>{currSubCategory}</div>
        </div>
      </ToolbarButton>
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
  ellipsis: css({
    display: 'flex',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  button: css({ maxWidth: '200px' }),
  text: css({
    paddingLeft: '10px',
  }),
});

export default OptionDropdown;
