import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ApiProvider } from './components/ApiProvider';

jest.mock('./components/ApiProvider', () => ({
  ApiProvider: ({ children }) => <div data-testid="mock-api-provider">{children}</div>,
}));

test('renders FrontPage within ApiProvider', () => {
  render(<App />);

  const apiProviderElement = screen.getByTestId('mock-api-provider');
  const frontPageElement = screen.getByTestId('front-page'); 

  expect(apiProviderElement).toBeInTheDocument();
  expect(frontPageElement).toBeInTheDocument();
  expect(apiProviderElement).toContainElement(frontPageElement);
});
