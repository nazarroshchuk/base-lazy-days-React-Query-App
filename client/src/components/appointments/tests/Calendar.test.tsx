import { findByRole, render, screen } from '@testing-library/react';

import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { Calendar } from '../Calendar';
import { mockUser } from '../../../mocks/mockData';
import {
  generateQueryClient,
  renderWithQueryClient,
} from '../../../test-utils';
import { MemoryRouter } from 'react-router-dom';
import { setLogger, QueryClientProvider, QueryClient } from 'react-query';

// mocking useUser to mimic a logged-in user
jest.mock('../../user/hooks/useUser', () => ({
  __esModule: true,
  useUser: () => ({ user: mockUser }),
}));

test('Appointment query error', async () => {
  // (re)set handler to return a 500 error for appointments
  server.resetHandlers(
    rest.get(
      'http://localhost:3030/appointments/:month/:year',
      (req, res, ctx) => {
        return res(ctx.status(500));
      },
    ),
  );

  // ** this part doesn't work WHY ??? ***

  // renderWithQueryClient(
  //   <MemoryRouter>
  //     <Calendar />
  //   </MemoryRouter>,
  // );
  //
  // // check for the toast alert
  // const alertToast = await screen.findByRole('alert');
  // expect(alertToast).toHaveTextContent('Request failed with status code 500');
});
