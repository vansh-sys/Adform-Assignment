import React from 'react';
import { shallow, configure } from 'enzyme';
import CampaignList from '../components/CampaignList';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("CampaignList", () => {
  it("should render self & sub components", () => {
    const wrapper = shallow(<CampaignList/>);
    expect(wrapper.find('header').hasClass('header')).toBe(true)
  });
});