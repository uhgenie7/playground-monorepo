'use client';

import type { NextPage } from 'next';
import SignupForm from '@/components/Form';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';
import arrayState from '@/store/arrayState';
import { SCButton } from '@uhgenie7/ui';

import type { ISignupParams } from '@/types/signup';
import { useRouter } from 'next/router';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const [array, setArray] = useRecoilState(arrayState);
  const arrayValue = useRecoilValue(arrayState);
  const setArrayState = useSetRecoilState(arrayState);
  const resetArrayState = useResetRecoilState(arrayState);

  const onClickNavigateGoBack = () => {
    router.back();
  };

  const handleSubmit = ({
    id,
    password,
    email,
    phonenumber,
    worker_phonenumber,
  }: ISignupParams) => {
    if (!id || !password || !email || !phonenumber || !worker_phonenumber)
      return;

    // join.mutate({ email, password, organization });
  };

  return (
    <div>
      <SignupForm
        onClickNavigateGoBack={onClickNavigateGoBack}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default IndexPage;
