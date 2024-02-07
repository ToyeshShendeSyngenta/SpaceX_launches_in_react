import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { ApiProvider } from './ApiProvider';

jest.mock('./ApiProvider', () => ({
  ...jest.requireActual('./ApiProvider'),
  useApi: jest.fn(),
}));

describe('ApiProvider', () => {
  beforeEach(() => {
    jest.resetAllMocks(); 
  });

  it('should fetch launch data with default filters', async () => {
    const mockUseApi = jest.fn().mockReturnValue({
      launchData: [],
      filters: { launchYear: '', launchSuccess: null, landSuccess: null },
      handleFilterChange: jest.fn(),
    });

    ApiProvider.useApi = mockUseApi;

    render(<ApiProvider><div /></ApiProvider>);

    await waitFor(() => {
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'launchYear',
        ''
      );
    });
  });

  it('should fetch launch data with updated filters', async () => {
    const mockUseApi = jest.fn().mockReturnValue({
      launchData: [],
      filters: { launchYear: '2021', launchSuccess: true, landSuccess: true },
      handleFilterChange: jest.fn(),
    });

    ApiProvider.useApi = mockUseApi;

    render(<ApiProvider><div /></ApiProvider>);

    await waitFor(() => {
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'launchYear',
        '2021'
      );
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'launchSuccess',
        true
      );
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'landSuccess',
        true
      );
    });
  });

  it('should fetch launch data when filters are reset', async () => {
    const mockUseApi = jest.fn().mockReturnValue({
      launchData: [],
      filters: { launchYear: '2021', launchSuccess: true, landSuccess: true },
      handleFilterChange: jest.fn(),
    });

    ApiProvider.useApi = mockUseApi;

    render(<ApiProvider><div /></ApiProvider>);

    await waitFor(() => {
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'launchYear',
        ''
      );
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'launchSuccess',
        null
      );
      expect(mockUseApi().handleFilterChange).toHaveBeenCalledWith(
        'landSuccess',
        null
      );
    });
  });
});
