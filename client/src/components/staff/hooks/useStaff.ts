import { Dispatch, SetStateAction, useState } from 'react';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';
import { useQuery } from 'react-query';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  staff: Staff[];
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  const { data: staff = [] } = useQuery(queryKeys.staff, getStaff);
  const [filter, setFilter] = useState('all');

  return { staff, filter, setFilter };
}
