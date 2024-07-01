import { useOutletContext } from 'react-router-dom';
import RequestForm from '../components/Requests/New-Requests/RequestForm';

const NewRequestPage = () => {
  const [selectedRequestType, setSelectedRequestType] = useOutletContext()
  return <RequestForm setRequestType={setSelectedRequestType} requestType={selectedRequestType}/>;
};

export default NewRequestPage;
