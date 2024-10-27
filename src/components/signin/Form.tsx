import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import Button from '@shared/Button.tsx';
import Flex from '@shared/Flex.tsx';
import Spacing from '@shared/Spacing.tsx';
import TextField from '@shared/TextField.tsx';
import validator from 'validator';

export type TFormValues = {
  email: string;
  password: string;
};

function Form({ onSubmit }: { onSubmit: (values: TFormValues) => void }) {
  const [formValues, setFormValues] = useState<TFormValues>({
    email: '',
    password: '',
  });

  const handleChangeFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const isOkToSubmit = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={FormContainer}>
      <TextField
        required
        type="email"
        label="이메일"
        name="email"
        value={formValues.email}
        onChange={handleChangeFormValues}
        placeholder="관리자 이메일을 입력해주세요!"
      />
      <Spacing size={24} />
      <TextField
        required
        type="password"
        label="비밀번호"
        name="password"
        value={formValues.password}
        onChange={handleChangeFormValues}
        placeholder="관리자 비밀번호를 입력해주세요!"
      />
      <Spacing size={24} />
      <Button
        disabled={!isOkToSubmit}
        color="primary"
        onClick={() => {
          onSubmit({ email: formValues.email, password: formValues.password });
        }}
        size="large"
      >
        로그인
      </Button>
    </Flex>
  );
}

const FormContainer = css`
  padding: 24px;
`;

function validate(formValues: TFormValues) {
  const errors: Partial<TFormValues> = {};

  if (!validator.isEmail(formValues.email)) {
    errors.email = '이메일 형식을 확인해주세요.';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.';
  }

  return errors;
}

export default Form;
