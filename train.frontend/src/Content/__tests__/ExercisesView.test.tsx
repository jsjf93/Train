import * as React from 'react';
import ExercisesView from '../Exercises/ExerciseList/ExercisesView';
import { Exercise } from '../../Interfaces/Interfaces';
import { render, fireEvent } from '@testing-library/react';

describe('<ExerciseView />', () => {
  let testExercises: Exercise[] = [];

  const onExercisesChange = (exercises: Exercise[]) => (testExercises = exercises);

  beforeEach(() => {
    testExercises = [
      { id: 1, name: 'Pushup', bodyPartsUsed: ['Chest', 'Shoulders', 'Triceps'] },
      { id: 2, name: 'Pullup', bodyPartsUsed: ['Back', 'Biceps'] },
      { id: 3, name: 'Squat', bodyPartsUsed: ['Quadriceps'] },
    ];
  });

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

  it('Shows a <Modal /> when the new exerise <Button /> is clicked', () => {
    const { queryByTestId } = render(
      <ExercisesView exercises={testExercises} bodyParts={[]} onChange={onExercisesChange} />,
    );

    const newExerciseButton = queryByTestId('newExerciseButton');
    let modal = queryByTestId('modal');

    expect(newExerciseButton).toBeInTheDocument();
    expect(modal).not.toBeInTheDocument();

    fireEvent.click(newExerciseButton!);
    modal = queryByTestId('modal');

    expect(modal).toBeInTheDocument();
  });

  it('An exercise cannot be added without at least one bodyPart selected', () => {
    const { getByTestId } = render(
      <ExercisesView exercises={testExercises} bodyParts={[]} onChange={onExercisesChange} />,
    );
    const originalLength = testExercises.length;

    const newExerciseButton = getByTestId('newExerciseButton');
    fireEvent.click(newExerciseButton);

    const addExerciseButton = getByTestId('addExerciseButton');
    expect(addExerciseButton).toBeInTheDocument();

    const exerciseNameInput = getByTestId('exerciseNameInput');
    fireEvent.change(exerciseNameInput, { target: { value: 'a' } });

    fireEvent.click(addExerciseButton);

    expect(testExercises.length).toBe(originalLength);
  });

  it('Exercise with name and a checkbox selected is added when onChange is called', () => {
    const { getByTestId } = render(
      <ExercisesView exercises={testExercises} bodyParts={['Abs']} onChange={onExercisesChange} />,
    );

    const newExerciseButton = getByTestId('newExerciseButton');
    fireEvent.click(newExerciseButton);

    const addExerciseButton = getByTestId('addExerciseButton');
    expect(addExerciseButton).toBeInTheDocument();

    const exerciseNameInput = getByTestId('exerciseNameInput');
    fireEvent.change(exerciseNameInput, { target: { value: 'a' } });
    const exerciseCheckbox = getByTestId('AbsCheckbox').querySelector('input[type="checkbox"]');
    fireEvent.click(exerciseCheckbox!);

    fireEvent.click(addExerciseButton);

    expect(testExercises.length).toBe(4);
    expect(testExercises[3].name).toBe('a');
    expect(testExercises[3].bodyPartsUsed[0]).toBe('Abs');
  });

  it('<Button /> with data-testid addExerciseButton is disabled when exercise name input or checkboxes are empty', () => {
    const { getByTestId } = render(
      <ExercisesView exercises={testExercises} bodyParts={[]} onChange={onExercisesChange} />,
    );

    const newExerciseButton = getByTestId('newExerciseButton');
    fireEvent.click(newExerciseButton);

    const addExerciseButton = getByTestId('addExerciseButton');
    expect(addExerciseButton).toBeDisabled();
  });
});
