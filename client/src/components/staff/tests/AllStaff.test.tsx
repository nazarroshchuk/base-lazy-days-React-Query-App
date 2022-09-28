import { screen } from '@testing-library/react';

import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { AllStaff } from '../AllStaff';
import { renderWithQueryClient } from '../../../test-utils';

test('renders response from query', async () => {
  renderWithQueryClient(<AllStaff />);

  const allStaffTitles = await screen.findAllByRole('heading', {
    name: /divya|sandra|michael|mateo/i,
  });

  expect(allStaffTitles).toHaveLength(4);
});

test('handles query error', async () => {
  // (re)set handler to return a 500 error for staff
  server.resetHandlers(
    rest.get('http://localhost:3030/staff', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  renderWithQueryClient(<AllStaff />);

  const alertToast = await screen.findByRole('alert');
  expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
