import React from 'react';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';

const SearchScreen = () => {
  return (
    <Container>
      <Header searchBar>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
    </Container>
  );
};

export default SearchScreen;
