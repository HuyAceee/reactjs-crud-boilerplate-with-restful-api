import { SessionExpiredFullUrl } from '~/packages/common/Auth/constants/SessionExpired';
import { action } from '~/routes/Auth/src/_auth.refresh-token';
import { FetchAPI } from '~/shared/Utilities';

export const fetchApiClient = new FetchAPI({
  baseConfig: {
    baseURL: 'https://express-for-boilerplates-with-restful-api.vercel.app',
  },
  refreshTokenConfig: {
    request: async ({ accessToken, refreshToken }) => {
      const response = await action({
        request: new Request('/refresh-token', {
          method: 'POST',
          body: JSON.stringify({ accessToken, refreshToken }),
        }),
        params: {},
      }).then(value => {
        if (value) {
          return value.json();
        }
        return;
      });
      return response;
    },
    success: response => {
      console.log('Fetch API Client:: Token refreshed successfully!', response?.info);
      fetchApiClient.setAccessToken = () => response?.info.session.accessToken ?? '';
      fetchApiClient.setRefreshToken = () => response?.info.session.refreshToken ?? '';
    },
    failure: error => {
      console.log('Fetch API Client:: Token refreshed failure!', error);
      return window.location.replace(SessionExpiredFullUrl);
    },
    setRefreshCondition: error => {
      return error.response?.status === 403;
    },
  },
  setAccessToken: () => {
    return '';
  },
  setConditionApplyAccessToken: () => {
    return true;
  },
  setRefreshToken: () => {
    return '';
  },
});
