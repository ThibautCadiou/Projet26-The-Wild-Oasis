import { useEffect, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter and sort</p>
      </Row>

      <Row>
        <CabinTable />
      </Row>

      <Button onClick={() => setShowForm(!showForm)}>Add new cabin</Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
