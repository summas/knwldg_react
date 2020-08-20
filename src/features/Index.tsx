import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
} from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from '@material-ui/types';


import { useDispatch } from "react-redux";

import { selectArticles, fetchAsyncGetDaily } from "./article/articleSlice";
import { fetchAsyncGetCategory } from "./category/categorySlice";
import Articles from "./article/Articles";
import Category from "./category/Category";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    content: {
        marginTop: 85,
    },
    root: {
        width: 360,
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

const Index: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const daily = useSelector(selectArticles)

    useEffect(() => {
        dispatch(fetchAsyncGetDaily(""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAsyncGetCategory());
    }, [dispatch]);

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Covid 19 Live Dashboard
          </Typography>
                    {/* <div>
                        <Typography variant="body1">
                            {new Date(daily[daily.length - 1].Date).toDateString()}
                        </Typography>
                    </div> */}
                </Toolbar>
            </AppBar>

            <Container className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={9}>
                        <Articles />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Category />
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}

export default Index
