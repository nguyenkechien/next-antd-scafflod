import { ApiStrapi, ReaderAccount } from '../../constants/ApiStrapi';
import fetch from 'isomorphic-unfetch';
import qs from 'query-string';
import { filterObject } from './../../core/util';

export const Reader = async () => {
  const reader = await fetch(ApiStrapi.auth, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    timeout: 10000,
    body: qs.stringify(filterObject(ReaderAccount, Boolean)),
  });
  try {
    const user = await reader.json();
    console.log(`user`, user);
    return user;
  } catch (error) {
    return '';
  }
};

export const AuthenUser = user => user;
