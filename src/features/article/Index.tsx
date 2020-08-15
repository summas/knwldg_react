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

import { selectArticles, fetchAsyncGetDaily } from "./articleSlice";
import Articles from "./Articles";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    content: {
        marginTop: 85,
    },
}));

const Index: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const daily = useSelector(selectArticles)

    useEffect(() => {
        dispatch(fetchAsyncGetDaily());
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
                    <Grid item xs={12} md={12}>
                        <Articles />
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}

export default Index
