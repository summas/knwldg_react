import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { MemoryRouter } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';

import { useSelector, useDispatch } from "react-redux";
import { selectCategories } from "./categorySlice";
import { fetchAsyncGetDaily } from "../article/articleSlice";


const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    marginTop: 12,
  },
}));

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const Category: React.FC = () => {
  const classes = useStyles();
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0} >
      <div className={classes.root} style={{ textAlign: "center" }} >
        <Paper elevation={0}>
          <ListItem
            button
            onClick={(event) => dispatch(fetchAsyncGetDaily(""))}
          >
            <ListItemText primary="カテゴリ" />
          </ListItem>
          <Divider />
          <List aria-label="secondary mailbox ">
            {categories.map((category) => (
              <ListItem
                button
                onClick={(event) => dispatch(fetchAsyncGetDaily(String(category.id)))}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </MemoryRouter >
  );
};

export default Category