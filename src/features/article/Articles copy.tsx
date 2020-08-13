import React from 'react';
import ReactDOM from 'react-dom'
import HOST from '../../appconf';

import styles from './index.module.css'

import { Card, CardContent, Typography, Grid } from "@material-ui/core";

// export function getData(target_dom) {
const Articles: React.FC = () => {

    let url = HOST + '/reacts/ajax';
    let el = null;

    fetch(url)
        .then(
            res => res.json(),
            (error) => {
                el = (
                    <p>ERROR!!</p>
                );
                // ReactDOM.render(el, target_dom);
            }
        )
        .then(
            (result) => {
                let arr = [];
                for (let n in result) {
                    let val = result[n];
                    var str = "/articles/show/" + val.id;
                    var date = new Date(val.created_at)
                    arr.push(
                        <Grid item xs={6} md={3} component={Card} className={styles.infected} key={val.id}>
                            <CardContent>
                                <img src={val.image.url} width="100" height="100" />
                                <Typography color="textSecondary" gutterBottom>
                                    {val.title}
                                </Typography>
                                <a href={str}>
                                    <Typography color="textSecondary" gutterBottom>
                                        {val.title}
                                    </Typography>
                                </a>
                                <Typography color="textSecondary" gutterBottom>
                                    投稿日: {date.toLocaleDateString()}
                                </Typography>
                            </CardContent>
                        </Grid >);
                }
                el = (
                    <div className={styles.container}>
                        <Grid container spacing={1} justify="center">
                            {arr}
                        </Grid>
                    </div>
                );
                return el;
            },
            (error) => {
                el = (
                    <p>ERROR!!</p>
                );
                // ReactDOM.render(el, target_dom);
                return el;
            }
        );

    return el;
}

export default Articles