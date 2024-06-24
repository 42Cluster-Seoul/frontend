import { getVariablesState } from 'app/features/variables/state/selectors';

import { TypedVariableModel, VariableOption } from '../../../../../packages/grafana-data/src';

export const getDashboardUidFromUrl = function () {
  const DEV = 2,
    PROD = 3;

  return window.location.pathname.split('/')[DEV];
};

export const determineUrl = function () {
  const DEV = 0,
    PROD = 1;

  const url = [
    ['/d/', '/login'],
    ['/grafana/d/', '/grafana/login'],
  ];

  return url[DEV];
};

export const variableQueryString = (uid: string) => {
  console.log('uid', uid);
  const result = getVariablesState(uid);
  console.log('result', result);
  const variable = result.variables.namespace;
  console.log(variable);
  // TODO : /var-namespace=All
  // 1) 미리 모든 variable을 받아와서 링크 구성하기
  // 2) includeAll = true로 만들고, 내부적으로 selectedValues에 모두 체크되도록 실행하기
  const prefix = '?';

  if (variable === undefined || !variable.multi) {
    return '';
  }

  console.log(prefix + variable.options.map((v: VariableOption) => `var-${variable.id}=${v.value}`).join('&'));

  return prefix + variable.options.map((v: VariableOption) => `var-${variable.id}=${v.value}`).join('&');
};

export const selectedValuesQueryString = (selectedValues: VariableOption[], variableId: string) => {
  const prefix = '?';

  if (selectedValues === undefined || selectedValues.length === 0) {
    return '';
  }

  return prefix + selectedValues.map((v: VariableOption) => `var-${variableId}=${v.value}`).join('&');
};
