
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
test("handles search input correctly", () => {
  const { getByPlaceholderText, getByTestId } = render( <ApiProvider> 
    <FrontPage />
  </ApiProvider>);
  const searchInput = getByPlaceholderText("Search");
  
  fireEvent.change(searchInput, { target: { value: "Mission 1" } });

  expect(searchInput.value).toBe("Mission 1");
 
});

test("renders filter options", () => {
  const { getByText } = render(<ApiProvider> 
  <FrontPage />
</ApiProvider>);
  expect(getByText("Filters")).toBeInTheDocument();
  expect(getByText("Name Search")).toBeInTheDocument();
  expect(getByText("Launch Year")).toBeInTheDocument();
  expect(getByText("Successful Launch")).toBeInTheDocument();
  expect(getByText("Successful Landing")).toBeInTheDocument();
});

test('Year tags render correctly', () => {
  render(<ApiProvider> 
    <FrontPage />
  </ApiProvider>);

  const yearTags = screen.getAllByRole('button', { name: /20\d{2}/ });

  expect(yearTags).toHaveLength(15); 

  const expectedYears = ['2006', '2007', '2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019', '2020'];
  expectedYears.forEach((year) => {
    const tag = screen.getByRole('button', { name: year });
    expect(tag).toBeInTheDocument();
    expect(tag).not.toHaveClass('active-tag'); 
  });
});

test.skip('Launch data renders correctly in cards', () => {
  render(<ApiProvider> 
    <FrontPage />
  </ApiProvider>);

  const cards = screen.getAllByRole('article', { name: /launch card/i });
  expect(cards).toHaveLength(1); 

  const card = cards[0];

  expect(card).toHaveTextContent('FalconSat #1');
  expect(card).toHaveTextContent('Mission IDs:');
  expect(card).toHaveTextContent('Launch Year: 2006');
  expect(card).toHaveTextContent('Launch Success: False');
  expect(card).toHaveTextContent('Successful Landing: False');

  const img = screen.getByAltText('FalconSat');
  expect(img).toHaveAttribute('src', 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png');
});