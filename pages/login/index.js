import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import FormItem from '../../components/FormItem';
import SubHeader from '../../components/SubHeader';

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      username
      token
    }
  }
`;


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const [loginUser] = useMutation(
    LOGIN_USER,
    {
      variables: { username, password },

      onCompleted: (data) => {
        if (data && data.loginUser && data.loginUser.token) {
          sessionStorage.getItem('token') && sessionStorage.removeItem('token');
          sessionStorage.setItem('token', data.loginUser.token);
          router.push('/cart');
        } else {
          router.push('/login');
        }

      },
    }
  );

  return (
    <>
      <SubHeader title='Login' />
      <FormWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <FormItem
            id='username'
            label='Username'
            placeholder='Your username'
            value={username}
            handleOnChange={(e) => setUsername(e.currentTarget.value)}
          />
          <FormItem
            id='password'
            label='Password'
            placeholder='Your password'
            value={password}
            handleOnChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button backgroundColor='royalBlue'>Login</Button>
        </form>
      </FormWrapper>
    </>
  );
}

export default Login;
