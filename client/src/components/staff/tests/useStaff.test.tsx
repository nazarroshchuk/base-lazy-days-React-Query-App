import { useStaff } from '../hooks/useStaff';
import { act, renderHook } from '@testing-library/react-hooks';
import { createQueryClientWrapper } from '../../../test-utils';

test('filter staff', async () => {
  const { result, waitFor } = renderHook(() => useStaff(), {
    wrapper: createQueryClientWrapper(),
  });
  // to get your bearings
  // console.log(result);
  // console.log(result.current);

  await waitFor(() => result.current.staff.length > 0);

  act(() => result.current.setFilter('massage'));

  await waitFor(() => result.current.staff.length === 3);
});
