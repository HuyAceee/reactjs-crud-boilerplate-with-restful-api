import type { ActionFunctionArgs, LoaderFunctionArgs } from '~/overrides/remix';
import { authSessionStorage } from '~/packages/common/Auth/utils/sessionStorage';

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  return await authSessionStorage.destroySession({
    request,
    redirectUrl: loginUrl => [loginUrl, searchParams].filter(Boolean).join('?'),
  });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  return await authSessionStorage.destroySession({
    request,
    redirectUrl: loginUrl => [loginUrl, searchParams].filter(Boolean).join('?'),
  });
};
