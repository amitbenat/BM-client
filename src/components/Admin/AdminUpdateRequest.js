import axios from 'axios';

export const AdminUpdateRequest = (isAccept, id, authCtx, desc) => {
  let currentRequestDetails = {
    status: 'closed',
    isValid: true,
  };
  if (!isAccept) {
    currentRequestDetails = {
      status: 'closed',
      isValid: false,
      reasonIfNeeded: desc,
    };
  }

  let url = `http://localhost:8080/admin-open-requests/${id}`;
  axios
    .patch(url, currentRequestDetails, {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      alert(err);
    });
};
