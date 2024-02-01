import { render, screen, waitFor } from '@testing-library/react';
import { ApiProvider } from './ApiProvider';
import axios from 'axios';

test('fetches launch data and applies filters', async () => {
  render(<ApiProvider />);
  
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('https://api.spaceXdata.com/v3/launches?limit=100');
  });

  const { handleFilterChange } = useApi();
  handleFilterChange('launchYear', '2020');

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith('https://api.spaceXdata.com/v3/launches?limit=100&launch_year=2020');
  });
});
