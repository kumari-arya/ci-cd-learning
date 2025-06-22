import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

// A wrapper to provide necessary context for tests
const TestWrapper = ({ children }) => (
  <AuthProvider>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </AuthProvider>
);

describe('App Component', () => {
  test('renders homepage with navigation and main content', () => {
    render(<App />, { wrapper: TestWrapper });

    // Check for main heading on the homepage
    expect(screen.getByRole('heading', { name: /Welcome to MERN CI\/CD Learning Project/i })).toBeInTheDocument();

    // Check for navigation links
    const nav = screen.getByRole('navigation');
    expect(within(nav).getByRole('link', { name: /Login/i })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: /Register/i })).toBeInTheDocument();

    // Check for call-to-action buttons in the main content
    const main = screen.getByRole('main');
    expect(within(main).getByRole('link', { name: /Get Started/i })).toBeInTheDocument();
    expect(within(main).getByRole('link', { name: /Login/i })).toBeInTheDocument();
  });
});
