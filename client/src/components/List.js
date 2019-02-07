// @flow

import React from 'react';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialList from '@material-ui/core/List';
import Item from './Item';
import {
  getStudents,
  toggleBreak,
  updateComment,
  removeBreak,
} from 'api';
import { formateToNChar } from 'utils';

import { type StudentType } from 'types/DataTypes';

const styles = () => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
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
  classes: Object,
};

type State = {
  students: Array<StudentType>,
  status: 'loading' | 'failed' | 'success',
};

class List extends React.PureComponent<Props, State> {
  state: State = {
    status: 'loading',
    students: {},
  };

  async componentDidMount() {
    try {
      const students = await getStudents();
      this.setState({ students, status: 'success' });
    } catch (e) {
      console.error('fail to get logins.');
      this.setState({ status: 'failed' });
    }
  }

  onToggleStudent = async (login: string) => {
    const date = new Date();
    const hours = `${date.getHours()}`;
    const minutes = `${date.getMinutes()}`;
    const formatedDate = `${formateToNChar(hours, 2)}:${formateToNChar(minutes, 2)}`;
    try {
      const students = await toggleBreak(login, formatedDate);
      this.setState({ students });
    } catch (e) {
      console.error(e);
      alert('fail to toggle student break.');
    }
  }

  onRemoveStudentBreak = async (login: string, date: string) => {
    try {
      const students = await removeBreak(login, date);
      this.setState({ students });
    } catch (e) {
      console.error(e);
      alert('fail to remove break.');
    }
  };

  onEditComment = async (login: string, comment: string) => {
    try {
      const students = await updateComment(login, comment);
      this.setState({ students });
    } catch (e) {
      console.error(e);
      alert('fail to update comment.');
    }
  };

  renderItem = (student: StudentType, index: number) => (
    <Item
      key={`${student.login}_${index}`}
      onToggle={this.onToggleStudent}
      onRemoveBreak={this.onRemoveStudentBreak}
      onEditComment={this.onEditComment}
      student={student}
    />
  )

  renderError() {
    const { classes } = this.props;

    return (
      <img
        className={classes.center}
        alt='error'
        src='https://cdn.dribbble.com/users/463734/screenshots/2016799/generic-error_shot.png'
      />
    );
  }

  renderLoading() {
    const { classes } = this.props;

    return (
      <CircularProgress className={classes.center} />
    );
  }

  render() {
    const { status, students } = this.state;
    const { classes } = this.props;

    if (status === 'loading') {
      return this.renderLoading();
    }
    if (status === 'failed') {
      return this.renderError();
    }

    return (
      <MaterialList className={classes.container}>
        {students.map(this.renderItem)}
      </MaterialList>
    );
  }
}

export default withStyles(styles)(List);
