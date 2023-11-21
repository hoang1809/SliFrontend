export const PREFIX_STORE = 'cer:';

export enum THEME_MODE {
  light = 'light',
  dark = 'dark',
}
export interface ThemeState {
  themeMode: THEME_MODE;
}

export const StorageKeys = {
  accessToken: `${PREFIX_STORE}accessToken`,
  userId: `${PREFIX_STORE}userId`,
};
