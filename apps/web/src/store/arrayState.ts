import { atom } from 'recoil';

const arrayState = atom<string[]>({
  key: 'arrayState',
  default: ['', 'Ella', 'Chris', '', 'Paul'],
});

export default arrayState;
