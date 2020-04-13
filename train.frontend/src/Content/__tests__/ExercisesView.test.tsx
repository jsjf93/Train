import * as React from 'react';
import { shallow } from 'enzyme';
import ExercisesView from '../Exercises/ExerciseList/ExercisesView';
import { Exercise } from '../../Interfaces/Interfaces';
import { render, fireEvent, queryByTestId } from '@testing-library/react';

let testExercises: Exercise[] = [];

const onExercisesChange = (exercises: Exercise[]) => (testExercises = exercises);

beforeEach(() => {
  testExercises = [
    { id: 1, name: 'Pushup', bodyPartsUsed: ['Chest', 'Shoulders', 'Triceps'] },
    { id: 2, name: 'Pullup', bodyPartsUsed: ['Back', 'Biceps'] },
    { id: 3, name: 'Squat', bodyPartsUsed: ['Quadriceps'] },
  ];
});

describe('<ExerciseView />', () => {
  it('Renders correctly with no exercises', () => {
    const { queryByTestId } = render(<ExercisesView exercises={[]} bodyParts={[]} onChange={onExercisesChange} />);

    const outerContainer = queryByTestId('outerContainer');
    const inputFieldContainer = queryByTestId('inputFieldContainer');
    const searchIcon = queryByTestId('searchIcon');
    const newExerciseButton = queryByTestId('newExerciseButton');
    const inputBase = queryByTestId('inputBase');
    const modal = queryByTestId('modal');
    const tableContainer = queryByTestId('tableContainer');
    const tableColumnNameRow = queryByTestId('tableColumnNameRow');
    const tableBody = queryByTestId('tableBody');

    expect(outerContainer).toBeInTheDocument();
    expect(inputFieldContainer).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(newExerciseButton).toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();
    expect(inputBase).not.toHaveValue();
    expect(tableContainer).toBeInTheDocument();
    expect(tableColumnNameRow).toBeInTheDocument();
    expect(tableBody).toBeEmpty();
  });

  it('Renders correctly with exercises', () => {
    const { queryByTestId } = render(
      <ExercisesView exercises={testExercises} bodyParts={[]} onChange={onExercisesChange} />,
    );

    const outerContainer = queryByTestId('outerContainer');
    const inputFieldContainer = queryByTestId('inputFieldContainer');
    const searchIcon = queryByTestId('searchIcon');
    const newExerciseButton = queryByTestId('newExerciseButton');
    const inputBase = queryByTestId('inputBase');
    const modal = queryByTestId('modal');
    const tableContainer = queryByTestId('tableContainer');
    const tableColumnNameRow = queryByTestId('tableColumnNameRow');
    const tableBody = queryByTestId('tableBody');

    expect(outerContainer).toBeInTheDocument();
    expect(inputFieldContainer).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(newExerciseButton).toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();
    expect(inputBase).not.toHaveValue();
    expect(tableContainer).toBeInTheDocument();
    expect(tableColumnNameRow).toBeInTheDocument();
    expect(tableBody).not.toBeEmpty();
  });
});
