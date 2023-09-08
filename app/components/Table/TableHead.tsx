
import { TableCell, TableRow } from '@mui/material';

import { TableHead as CustomTableHead } from './styles';

type TableHeadProps = { 
  titles: string[]
}

export function TableHead ({ titles }: TableHeadProps) {
  return (
    <CustomTableHead>
      <TableRow>
        {
          titles.map((title, index) => (
            <TableCell key={index}>{ title }</TableCell>
          ))
        }
      </TableRow>
    </CustomTableHead>
  )
}