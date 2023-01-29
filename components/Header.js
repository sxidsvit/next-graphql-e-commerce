import styled from 'styled-components';
import Head from 'next/head';

const HeaderWrapper = styled.div`
  background-color: royalBlue;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px 2vmin);
  color: white;
`;

const Title = styled.h1`
  height: 64px;
  pointer-events: none;
`;

function Header() {
  return (
    <>
      <Head>
        <title>Online store</title>
        <meta
          name='description'
          content='Online store build with Next.js and GraphQL support'
        />
      </Head>
      <HeaderWrapper>
        <Title>Online store</Title>
      </HeaderWrapper>
    </>
  );
}

export default Header;
