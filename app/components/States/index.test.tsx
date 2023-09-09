import { render, screen } from '@testing-library/react';
import { State } from '.';

describe('State component', () => {
  it('should render loading state', () => {
    render(<State state="loading" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render error state with default message', () => {
    render(<State state="error" />);
    expect(screen.getByText('An error has occurred, please try again later')).toBeInTheDocument();
  });

  it('should render error state with custom message', () => {
    const customErrorMessage = 'Custom error message';
    render(<State state="error" errorText={customErrorMessage} />);
    expect(screen.getByText(customErrorMessage)).toBeInTheDocument();
  });

  it('should render empty state with default message', () => {
    render(<State state="empty" />);
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  it('should render empty state with custom message', () => {
    const customEmptyMessage = 'Custom empty message';
    render(<State state="empty" emptyText={customEmptyMessage} />);
    expect(screen.getByText(customEmptyMessage)).toBeInTheDocument();
  });
});