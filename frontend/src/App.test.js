import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

// Create a new QueryClient for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Wrapper component for testing
const TestWrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </QueryClientProvider>
);

test('renders app without crashing', () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>,
  );

  // Check if the main navigation is rendered
  expect(screen.getByText(/MERN CI\/CD Project/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>,
  );

  // Check if login and register links are present
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
});
