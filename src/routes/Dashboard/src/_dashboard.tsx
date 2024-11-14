import { useEffect } from 'react';
import type { LoaderFunctionArgs, TypedResponse } from '~/overrides/remix';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { DashboardLayout } from '~/layouts/DashboardLayout/DashboardLayout';
import { useLoaderData } from '~/overrides/remix';
import { json, redirect } from '~/overrides/remix';
import { SessionExpiredFullUrl } from '~/packages/common/Auth/constants/SessionExpired';
import { SessionData } from '~/packages/common/Auth/models/SessionData';
import { getProfile } from '~/packages/common/Auth/services/getProfile';
import { authSessionStorage } from '~/packages/common/Auth/utils/sessionStorage';
import { fetchApiClient } from '~/utils/fetchApi/fetchApi.client';

export interface LoaderResponse {
  sessionData: SessionData;
}

export const loader = async (remixRequest: LoaderFunctionArgs): Promise<TypedResponse<LoaderResponse>> => {
  const { request } = remixRequest;
  const sessionData = await authSessionStorage.guard({ request });
  try {
    const response = await getProfile({ remixRequest });
    sessionData.set('profile', {
      avatar: '',
      fullName: `Latest ${response.data.member.memberName} - ${Date.now()}`,
      role: response.data.member.role,
    });
    const headers = await authSessionStorage.commitSessionAsHeaders(sessionData);

    return json({ sessionData: sessionData.data }, { headers });
  } catch (error) {
    console.log('DashboardLayout:: ', error);
    return redirect(SessionExpiredFullUrl);
  }
};

export const Page = () => {
  const { sessionData } = useLoaderData<typeof loader>();
  useEffect(() => {
    fetchApiClient.setAccessToken = () => sessionData.accessToken;
    fetchApiClient.setRefreshToken = () => sessionData.refreshToken;
  }, [sessionData]);

  if (sessionData) {
    return <DashboardLayout sessionData={sessionData} />;
  }
  return <PageErrorBoundary />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
