// @flow

import React from 'react';
import memoize from 'memoize-one';
import throttle from 'lodash.throttle';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
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
  comment: {
    width: '100%',
  },
  chipList: {
    overflowX: 'scroll',
    display: 'flex',
  },
  chip: {
    marginRight: 10,
    marginBottom: 5,
  },
});

type Props = {
  student: StudentType,
  onToggle: (login: string) => void,
  onRemoveBreak: (login: string, date: string) => void,
  onEditComment: (login: string, comment: string) => void,
  classes: Object, // provided by HOC
};

class Item extends React.PureComponent<Props> {
  commentRef: React.Ref = null;

  onToggle = () => {
    const { onToggle, student } = this.props;

    onToggle(student.login);
  };

  onRemoveBreak = memoize((breakDate: string) => {
    const { student, onRemoveBreak } = this.props;
    onRemoveBreak(student.login, breakDate);
  });

  onEditComment = () => {
    if (!this.commentRef) return;

    const { onEditComment, student } = this.props;
    const { value } = this.commentRef;
    onEditComment(student.login, value);
  };

  renderChip = (breakValue: BreakType, index: number) => {
    const { classes } = this.props;
    const { begin, end } = breakValue;

    return (
      <Chip
        className={classes.chip}
        label={`${begin} - ${end}`}
        key={`${begin}_${end}_${index}`}
        onDelete={this.onRemoveBreak.bind(this, `${begin} -> ${end}`)}
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

  renderProfileInformation() {
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

  renderChipList() {
    const { classes, student } = this.props;

    return (
      <div className={classes.chipList}>
        {student.breaks.map(this.renderChip)}
      </div>
    );
  }

  renderComment() {
    const { student, classes } = this.props;

    return (
      <TextField
        className={classes.comment}
        label='comment'
        rowsMax='4'
        defaultValue={student.comment}
        onBlur={this.onEditComment}
        margin='normal'
        variant='outlined'
        inputRef={r => this.commentRef = r}
        multiline
      />
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.renderProfileInformation()}
        {this.renderChipList()}
        {this.renderComment()}
      </div>
    );
  }
}

export default withStyles(styles)(Item);
