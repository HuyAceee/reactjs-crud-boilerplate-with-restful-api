import { redirect } from '~/overrides/remix';

export const loader = async () => redirect('/dashboard');

export const Page = () => {
  return null;
};

export default Page;
