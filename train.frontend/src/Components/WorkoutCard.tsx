import * as React from 'react';
import moment from 'moment';
import { Workout } from '../Interfaces/Interfaces';
import { Card, CardContent, CardHeader, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { Accessibility, MoreVert, WatchLater } from '@material-ui/icons';

interface IProps {
  workout: Workout;
  onDeleteWorkout: (workout: Workout) => void;
  onEditWorkout: (workout: Workout) => void;
}

const useStyles = makeStyles({
  root: {
    height: 150,
    boxShadow: '0px 0px 5px rgb(151, 151, 151)',
  },
  contentPadding: {
    padding: '8px 16px 4px 16px',
  },
  contentAligned: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    opacity: 0.8,
  },
});

const WorkoutCard: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.contentPadding}
        action={
          <IconButton aria-label="options" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
        title={props.workout.name}
      />
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={() => props.onDeleteWorkout(props.workout)}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Start Workout</MenuItem>
      </Menu>
      <CardContent className={classes.contentPadding}>
        {props.workout.lastPerformed && (
          <div className={classes.contentAligned}>
            <WatchLater className={classes.icon} />
            <span>{moment(props.workout.lastPerformed).format('DD/MM/YY')}</span>
          </div>
        )}

        {props.workout.bodyPartsUsed && (
          <div className={classes.contentAligned}>
            <Accessibility className={classes.icon} />
            <span>{props.workout.bodyPartsUsed}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;
