import * as React from 'react';
import { shallow } from 'enzyme';
import ExercisesView from '../Exercises/ExerciseList/ExercisesView';
import SearchIcon from '@material-ui/icons/Search';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { StoreProvider } from '../../index';

describe('ExerciseView', () => {
  it('Renders correctly with no exercises', () => {
    // Arrange
    const component = shallow(<ExercisesView exercises={[]} />);
    // Act
    //const searchIcons = component.find(SearchIcon);
    // Assert
    //expect(searchIcons.length).toBe(1);
  });
});
