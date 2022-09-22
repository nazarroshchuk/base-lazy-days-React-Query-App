import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';

async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const toast = useCustomToast();
  const { data = [] } = useQuery(queryKeys.treatments, getTreatments, {
    onError: (error) => {
      const title =
        error instanceof Error ? error.message : 'error connecting to server';
      toast({ title, status: 'error' });
    },
  });

  return data;
}
