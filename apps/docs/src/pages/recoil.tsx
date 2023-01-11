import type { NextPage } from 'next';
import Head from 'next/head';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';
import arrayState from '@/store/arrayState';
import { SCButton } from 'ui';

const RecoilPage: NextPage = () => {
  const [array, setArray] = useRecoilState(arrayState);
  const arrayValue = useRecoilValue(arrayState);
  const setArrayState = useSetRecoilState(arrayState);
  const resetArrayState = useResetRecoilState(arrayState);

  return (
    <div>
      <Head>
        <title>Recoil Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h2>useRecoilState</h2>
        <p>array: {array.join(', ')}</p>
        <SCButton
          onClick={() => {
            setArray(['clicked']);
          }}
        >
          click me
        </SCButton>
      </div>
      <div>
        <h2>useRecoilValue</h2>
        <p>arrayValue: {arrayValue}</p>
      </div>
      <div>
        <h2>useSetRecoilState</h2>
        <p>
          <SCButton
            onClick={() => {
              setArrayState(['setArrayState']);
            }}
          >
            click me
          </SCButton>
        </p>
      </div>
      <div>
        <h2>useResetRecoilState</h2>
        <p>
          <SCButton onClick={resetArrayState}>리셋</SCButton>
        </p>
      </div>
    </div>
  );
};

export default RecoilPage;
