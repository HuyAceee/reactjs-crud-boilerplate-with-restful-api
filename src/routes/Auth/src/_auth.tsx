import { isEmpty } from 'ramda';
import { PageErrorBoundary } from '~/components/PageErrorBoundary/PageErrorBoundary';
import { AuthLayout } from '~/layouts/AuthLayout/AuthLayout';
import { redirect, type LoaderFunctionArgs } from '~/overrides/remix';
import { authSessionStorage } from '~/packages/common/Auth/utils/sessionStorage';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await authSessionStorage.getSession(request);
  const { searchParams } = new URL(request.url);
  if (!isEmpty(session.data)) {
    throw redirect(searchParams.get('redirectTo') ?? '/');
  }
  return null;
};

export const Page = () => {
  return <AuthLayout />;
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
