import React from 'react';
import { shallow, configure } from 'enzyme';
import {SearchBox} from '../components/SearchBox';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const props = {
    onSearch: jest.fn()
  }

describe("SearchBox", () => {
  it("should render search component", () => {
    const wrapper = shallow(<SearchBox onSearch={props}/>);
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});