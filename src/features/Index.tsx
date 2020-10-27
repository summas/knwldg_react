import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { fetchAsyncGetArticles } from "./article/articleSlice";
import { fetchAsyncGetCategory } from "./category/categorySlice";
import Articles from "./article/Articles";
import Category from "./category/Category";
import Catename from "./catename/Catename";

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

const Index: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncGetArticles(""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAsyncGetCategory());
    }, [dispatch]);

    return (
        <div>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        PFナレッジサイトReact試作
          </Typography>
                </Toolbar>
            </AppBar>

            <Container className={classes.content}>
                <Catename />
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
