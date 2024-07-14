import { useState } from 'react';
import Modal from '../UI/Modal';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './AdminDateChange.css'

const AdminDateChange = (props) => {
  const [pickedData, setPickedData] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: 'selection',
    },
  ]);

  const submitFormHandler = () => {
    props.setDateRange(pickedData);
    props.onClose();
    props.setPage(1);
  };

  return (
    <Modal onClose={props.onClose}>
      <div className='date-filter'>

      <button onClick={props.onClose}>X</button>
      <h3>בחר טווח תאריכים</h3>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setPickedData([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={pickedData}
        />
      <button onClick={submitFormHandler}>חפש</button>
        </div>
    </Modal>
  );
};

export default AdminDateChange;
