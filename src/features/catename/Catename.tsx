import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from 'react-dom';

import {
  Typography
} from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MemoryRouter } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { selectCateName } from "./cateNameSlice";
import { fetchAsyncGetArticles } from "../article/articleSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    marginTop: 70,
  },
}));

const Catename: React.FC = () => {
  const classes = useStyles();
  const catename = useSelector(selectCateName);
  console.log("catename");
  console.log(catename);
  const dispatch = useDispatch();

  return (
    <Typography className={classes.root} style={{ textAlign: "right" }}>
      {catename}
    </Typography>
  );
};

export default Catename
