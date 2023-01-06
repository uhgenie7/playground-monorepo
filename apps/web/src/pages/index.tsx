import type { NextPage } from 'next';
import Head from 'next/head';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';
import arrayState from '@/store/arrayState';

const IndexPage: NextPage = () => {
  const [array, setArray] = useRecoilState(arrayState);
  const arrayValue = useRecoilValue(arrayState);
  const setArrayState = useSetRecoilState(arrayState);
  const resetArrayState = useResetRecoilState(arrayState);

  return (
    <div>
      <Head>
        <title>NextJS Playground</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>Hello!</header>
      <div>
        <h2>useRecoilState</h2>
        <p>array: {array.join(', ')}</p>
        <button
          onClick={() => {
            setArray(['clicked']);
          }}
        >
          click me
        </button>
      </div>
      <div>
        <h2>useRecoilValue</h2>
        <p>arrayValue: {arrayValue}</p>
      </div>
      <div>
        <h2>useSetRecoilState</h2>
        <p>
          <button
            onClick={() => {
              setArrayState(['setArrayState']);
            }}
          >
            click me
          </button>
        </p>
      </div>
      <div>
        <h2>useResetRecoilState</h2>
        <p>
          <button onClick={resetArrayState}>리셋</button>
        </p>
      </div>
    </div>
  );
};

export default IndexPage;
