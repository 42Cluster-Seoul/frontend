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

export const variableQueryString = (variable: TypedVariableModel, selectedValues: VariableOption[]) => {
  // TODO : /var-namespace=All
  // 1) 미리 모든 variable을 받아와서 링크 구성하기
  // 2) includeAll = true로 만들고, 내부적으로 selectedValues에 모두 체크되도록 실행하기
  const prefix = '?';
  if (variable.multi) {
    return prefix + variable.options.map((v: VariableOption) => `var-${variable.id}=${v.value}`).join('&');
  }
  if (selectedValues.length) {
    return prefix + selectedValues.map((v: VariableOption) => `var-${variable.id}=${v.value}`).join('&');
  }
  return '';
};
