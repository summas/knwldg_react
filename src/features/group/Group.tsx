import React from 'react';
// import { makeStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MemoryRouter } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
// import { selectGroups } from "./groupSlice";
import { selectGroups } from "./groupSlice";
import { fetchAsyncSetCateName } from "../catename/cateNameSlice";
import { fetchAsyncGetArticles } from "../article/articleSlice";
import { fetchAsyncSetPage } from "../article/pageSlice";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    marginTop: 12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Group: React.FC = () => {
  const classes = useStyles();
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();
  const [selectedGroup, setGroup] = React.useState('');

  const handleChange = (event: any) => {
    setGroup(event.target.value);
  };

  return (
    <div className={classes.root} style={{ textAlign: "center" }} >
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">グループ</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={1}
          onChange={handleChange}
        >
          {groups.map((group) => (
            <MenuItem
              value={group.id}
              key={group.id}
            >
              {group.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Group
