import axios from 'axios';
import PORT from '../../EnviromentVars';

export const adminUpdateRequest = (isAccept, id, authCtx, desc) => {
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

  let url = `${PORT}/admin-open-requests/${id}`;
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
    });
};
