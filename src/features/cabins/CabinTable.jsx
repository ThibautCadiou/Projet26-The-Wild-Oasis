import { useQueries, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import { useSearchParams } from 'react-router-dom';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('discount') || 'all';

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName='Cabins' />;

  // 1) Filter
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);

  // 2) Sort
  const sortBy = searchParams.get('sortBy') || 'start-date-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    <Table role='table'>
      <TableHeader role='row'>
        <div className=''></div>
        <div className=''>Cabin</div>
        <div className=''>Capacity </div>
        <div className=''>Price</div>
        <div className=''>Discount</div>
        <div className=''></div>
      </TableHeader>
      {sortedCabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
