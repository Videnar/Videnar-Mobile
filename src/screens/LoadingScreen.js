import React from 'react';
import {Container, Header, Content, Spinner} from 'native-base';
const LoadingScreen = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Spinner />
      </Content>
    </Container>
  );
};

export default LoadingScreen;
