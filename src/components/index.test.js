
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('renders within StrictMode', () => {
    render(<App />);
  
    const strictModeElement = screen.getByTestId('apptestid'); 
    expect(strictModeElement).toBeInTheDocument();
  });
