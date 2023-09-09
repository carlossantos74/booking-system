import { fireEvent, render, screen } from '@testing-library/react';
import { TableMenu } from '.';

describe('TableMenu', () => {
  it('should render the component', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<TableMenu onDelete={onDelete} onEdit={onEdit} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should open the menu when the button is clicked', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<TableMenu onDelete={onDelete} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should call the onDelete function when the delete menu item is clicked', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<TableMenu onDelete={onDelete} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Delete'));

    expect(onDelete).toHaveBeenCalled();
  });

  it('should call the onEdit function when the edit menu item is clicked', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();

    render(<TableMenu onDelete={onDelete} onEdit={onEdit} />);

    fireEvent.click(screen.getByRole('button'));

    fireEvent.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalled();
  });
});