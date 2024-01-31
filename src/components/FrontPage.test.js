
import { render, screen,fireEvent } from '@testing-library/react';
import { ApiProvider } from './ApiProvider'; 
import FrontPage from './FrontPage';

test('renders the heading and cards container', async () => {
  render(
    <ApiProvider> 
      <FrontPage />
    </ApiProvider>
    
  );
  const heading = screen.getByText('SpaceX Launch Programs');
  const cardsContainer = screen.getByTestId('cards-container');
  expect(heading).toBeInTheDocument();
  expect(cardsContainer).toBeInTheDocument();
});


    