import { ApiStrapi, ReaderAccount } from '../../constants/ApiStrapi';
import { http } from '../../core/http';

export const AuthenUser = async user => {
  try {
    return await http.post(ApiStrapi.auth, { data: user });
  } catch (error) {
    console.log(`error`, error);
    return {
      jwt: '',
    };
  }
};

export const Reader = async () => await AuthenUser(ReaderAccount);
