import { createSelector } from 'reselect';

const selectUserList = (state) => state.userList;
const selectCampaigns = (state) => state.campaignList;
const selectPreparedList = (state) => state.preparedList;

const selectCampaignUsers = createSelector(
  [selectUserList, selectCampaigns, selectPreparedList],
  (userList, campaignList, preparedList) => ({ userList, campaignList, preparedList }),
);

export default selectCampaignUsers;
