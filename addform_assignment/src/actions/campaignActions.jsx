/* eslint-disable linebreak-style */
import Translations from '../translations/constants';

export const fetchCampaigns = () => async (dispatch) => {
  const Actions = Translations.actions;
  let users = [];
  // eslint-disable-next-line no-undef
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((data) => {
      users = data;
      dispatch({ type: Actions.fetchCampaigns, payload: users });
    })
    .catch((error) => error);
};

export const prepareRowData = (payload) => (dispatch) => {
  const Actions = Translations.actions;
  dispatch({
    type: Actions.prepareRows,
    payload,
  });
};

export const searchByName = (name) => (dispatch) => {
  const Actions = Translations.actions;
  dispatch({
    type: Actions.onSearch,
    payload: name,
  });
};

export const filterByDate = (startDate, endDate, campaignList) => (dispatch) => {
  const Actions = Translations.actions;
  dispatch({
    type: Actions.dateFilter,
    payload: { startDate, endDate, campaignList },
  });
};

export const addNewCampaigns = (campaigns) => (dispatch) => {
  const Actions = Translations.actions;
  dispatch({
    type: Actions.addCampaigns,
    payload: campaigns,
  });
};
