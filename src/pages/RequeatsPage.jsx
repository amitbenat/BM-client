import { Outlet } from 'react-router-dom';
import RequestsNavBar from '../components/Requests/RequestsNavBar';
import { useState } from 'react';

const RequestsPage = () => {
  const [selectedRequestType, setSelectedRequestType] = useState('');

  return (
    <>
      <RequestsNavBar setRequestType={setSelectedRequestType} requestType={selectedRequestType}/>
      <Outlet context={[selectedRequestType, setSelectedRequestType]}/>
    </>
  );
};

export default RequestsPage;
