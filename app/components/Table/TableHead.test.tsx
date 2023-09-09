import { render, screen } from '@testing-library/react';
import { TableHead } from './TableHead';

describe('TableHead', () => {
  it('renders the correct number of table cells', () => {
    const titles = ['Title 1', 'Title 2', 'Title 3'];
    render(<TableHead titles={titles} />);
    const tableCells = screen.getAllByRole('cell');

    expect(tableCells).toHaveLength(titles.length);
  });

  it('renders the correct titles in the table cells', () => {
    const titles = ['Title 1', 'Title 2', 'Title 3'];
    render(<TableHead titles={titles} />);
    const tableCells = screen.getAllByRole('cell');
    tableCells.forEach((cell, index) => {
      expect(cell).toHaveTextContent(titles[index]);
    });
  });
});