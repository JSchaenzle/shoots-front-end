import React from 'react';
import ReactDOM from 'react-dom';
import LoginCreateAccount from './LoginCreateAccount';

it('renders without crashing', () => {
  var handleCreate = () => {};
  var handleLogIn = () => {};
  var handleClearErrors = () => {};
  const div = document.createElement('div');
  ReactDOM.render(<LoginCreateAccount 
    onCreateAccount={handleCreate} 
    onLogIn={handleLogIn} 
    onClearErrors={handleClearErrors} />, div);
});

it('shows error if user enters invalid password', () => {

});