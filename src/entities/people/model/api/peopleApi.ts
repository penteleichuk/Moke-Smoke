import { authInstance } from 'shared/instance';
import { PeopleType } from './../types/people';

export const PeopleApi = {
  async get({ pageParam = 0 }) {
    return authInstance
      .get<PeopleResponseType>('/people/get', {
        params: { limit: 10, cursor: pageParam },
      })
      .then(response => {
        return response.data;
      });
  },
};

export type PeopleResponseType = {
  data: PeopleType[];
  nextCursor?: number;
};
