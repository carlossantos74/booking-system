import { render, screen } from '@testing-library/react';
import { Nav } from '.';

describe('Nav', () => {
  it('should render the correct links', () => {
    render(<Nav />);
    const usersLink = screen.getByRole('link', { name: /users/i });
    const roomsLink = screen.getByRole('link', { name: /rooms/i });
    const calendarLink = screen.getByRole('link', { name: /calendar/i });

    expect(usersLink).toHaveAttribute('href', '/users');
    expect(roomsLink).toHaveAttribute('href', '/rooms');
    expect(calendarLink).toHaveAttribute('href', '/');
  });
});