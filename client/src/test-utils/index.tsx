/* eslint-disable no-console */

import { render } from '@testing-library/react';
import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
  setLogger,
} from 'react-query';

import { defaultQueryClientOptions } from '../react-query/queryClient';
import React from 'react';

// suppress errors written to console
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    // swallow the errors
  },
});

const defaultOptions: DefaultOptions = defaultQueryClientOptions;
if (defaultOptions && defaultOptions.queries)
  defaultOptions.queries.retry = false;

// make this a function for unique queryClient per test
export const generateQueryClient = () => {
  console.log(defaultOptions);
  return new QueryClient({ defaultOptions });
};

export function renderWithQueryClient(
  ui: React.ReactElement,
  client?: QueryClient,
) {
  const queryClient = client ?? generateQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}
// ***FOR TESTING CUSTOM HOOKS*
// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createQueryClientWrapper = (): React.FC => {
  const queryClient = generateQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
