import * as actions from '../actions/campaignActions'

describe('actions', () => {
  it('should create an action to search by a searchKey', () => {
    const searchKey = 'Mo'
    const expectedAction = {
      type: 'ON_SEARCH',
      name:  searchKey
    }
    expect(actions.searchByName(searchKey)).toEqual(expectedAction)
  })
})