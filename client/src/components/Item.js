// @flow

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import {
  PlayArrow as PlayIcon,
  WatchLater as WatchIcon,
} from '@material-ui/icons';
import { GET_PICTURE_URL_FROM_LOGIN } from 'constants/network';
import Timer from './Timer';

import {
  type StudentType,
  type BreakType,
} from 'types/DataTypes';

const styles = () => ({
  container: {
    width: '100%',
    minWidth: 300,
    maxWidth: 600,
  },
  item: {
    marginTop: 30,
  },
  text: {
    maxWidth: '50%',
  },
  avatar: {
    height: 100,
    width: 100,
    marginRight: 20,
  },
  chipList: {
    overflowX: 'scroll',
    display: 'flex',
    paddingBottom: 20,
  },
  chip: {
    marginRight: 10,
    marginBottom: 5,
  },
});

type Props = {
  student: StudentType,
  onToggle: (login: string) => void,
  classes: Object, // provided by HOC
};

class Item extends React.PureComponent<Props> {
  onToggle = () => {
    const { onToggle, student } = this.props;

    onToggle(student.login);
  }

  renderChip = (breakValue: BreakType, index: number) => {
    const { classes } = this.props;
    const { begin, end } = breakValue;

    return (
      <Chip
        className={classes.chip}
        label={`${begin} - ${end}`}
        key={`${begin}_${end}_${index}`}
        icon={<WatchIcon />}
      />
    );
  };

  renderIcon() {
    const { student } = this.props;

    if (student.status === 'in progress') {
      return <Timer begin={student.lastUpdate} />;
    }
    return <PlayIcon />;
  }

  renderUpperSide() {
    const { classes, student } = this.props;
    const [firstname, lastname] = student.login.split('.');

    return (
      <ListItem
        className={classes.item}
        alignItems='center'
      >
        <ListItemAvatar>
          <Avatar
            alt={student.login}
            src={GET_PICTURE_URL_FROM_LOGIN(student.login)}
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${firstname.toLowerCase()}`}
          secondary={`${lastname.toUpperCase()}`}
          className={classes.text}
        />
        <ListItemSecondaryAction>
          <Button
            variant='contained'
            onClick={this.onToggle}
          >
            {this.renderIcon()}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  renderLowerSide() {
    const { classes, student } = this.props;

    return (
      <div className={classes.chipList}>
        {student.breaks.map(this.renderChip)}
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.renderUpperSide()}
        {this.renderLowerSide()}
      </div>
    );
  }
}

export default withStyles(styles)(Item);
