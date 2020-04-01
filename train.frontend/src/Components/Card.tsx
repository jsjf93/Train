import * as React from 'react';
import './Card.css';
import { Workout } from '../Interfaces/Interfaces';
import moment from 'moment';
import { MoreVert, Edit, Delete, WatchLater, Accessibility } from '@material-ui/icons';
import { useState, useEffect, useRef } from 'react';

type Props = {
  workout: Workout;
  onAddWorkout: (workout: Workout) => void;
  onDeleteWorkout: (id: number) => void;
  onEditWorkout: (workout: Workout) => void;
};

const Card = (props: Props): JSX.Element => {
  const useOutsideRefClick = (
    ref: React.RefObject<HTMLElement>,
    toggleContextMenu: (showContextMenu: boolean) => void,
  ): void => {
    const handleClick = (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleContextMenu(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClick);
      return (): void => document.removeEventListener('mousedown', handleClick);
    });
  };

  const [showContextMenu, toggleContextMenu] = useState(false);
  const ref = useRef(null);
  useOutsideRefClick(ref, toggleContextMenu);

  return (
    <div className={'card_container'} ref={ref}>
      <div className={'card_more-options'} onClick={(): void => toggleContextMenu(!showContextMenu)}>
        <MoreVert />
      </div>
      <h4>{props.workout.name}</h4>

      {showContextMenu && (
        <div className={'card_context-menu'}>
          <div onClick={(): void => props.onDeleteWorkout(props.workout.id)}>
            <Delete />
            Delete
          </div>
          <div onClick={(): void => props.onEditWorkout({ id: props.workout.id, name: 'Changed name' })}>
            <Edit />
            Edit
          </div>
        </div>
      )}

      {props.workout.lastPerformed && (
        <div className={'card_workout-info'}>
          <WatchLater />
          <span>{moment(props.workout.lastPerformed).format('DD/MM/YY')}</span>
        </div>
      )}

      {props.workout.bodyPartsUsed && (
        <div className={'card_workout-info'}>
          <Accessibility /> <span>{props.workout.bodyPartsUsed}</span>
        </div>
      )}

      <div className={'card_start-workout'}>Start</div>
    </div>
  );
};

export default Card;
