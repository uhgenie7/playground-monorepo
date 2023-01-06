import { atom } from 'recoil';

const arrayState = atom({
  key: 'arrayState', // unique ID (with respect to other atoms/selectors)
  default: ['', 'Ella', 'Chris', '', 'Paul'], // default value (aka initial value)
});

export default arrayState;
