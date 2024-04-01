import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationMaterialUI() {
  return (
    <Stack spacing={2}
    className='bg-stone-300 px-[2rem] p-[1rem] rounded-md flex items-center w-fit m-[auto]'
    >      
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}