import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const LOGIN_USER = gql`
  mutation loginUser($email: String!) {
    login(email: $email)
  }
`;

const Form = ({ isLoggedIn, login, logout }) => {
  let input = React.createRef();

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault();
            const email = input.current.value;
            login({
              variables: { email },
            });
          }}
        >
          <input type="text" ref={input} placeholder="Email" />
          <button className="button">Log in</button>
        </form>
      )}
    </div>
  );
};

export default class Login extends Component {
  logout = client => {
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
  };

  render = () => (
    <Query query={IS_LOGGED_IN}>
      {({ data: { isLoggedIn }, client }) => (
        <Mutation
          mutation={LOGIN_USER}
          onCompleted={({ login }) => {
            localStorage.setItem('token', login);
            client.writeData({ data: { isLoggedIn: true } });
          }}
        >
          {login => (
            <Form
              login={login}
              logout={() => this.logout(client)}
              isLoggedIn={isLoggedIn}
            />
          )}
        </Mutation>
      )}
    </Query>
  );
}

const styles = {
  container: { marginBottom: 16, width: '100%', textAlign: 'right' },
};
