import React from 'react';
import styles from "./index.module.css";
import HOST from '../../appconf';
// import CountUp from "react-countup";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

// import { Pagination } from "@material-ui/lab/Pagination";

// import { GiHastyGrave } from "react-icons/gi";
// import { MdLocalHospital } from "react-icons/md";
// import { AiFillLike } from "react-icons/ai";

import { useSelector } from "react-redux";
import { selectArticles } from "./articleSlice";
// import Articles from './Articles';

const Articles: React.FC = () => {
    const articles = useSelector(selectArticles);

    let arr = [];
    for (let n in articles) {
        let val = articles[n];
        var str = "articles/show/" + val.id;
        var date = new Date(val.created_at)
        arr.push(
            <Grid item xs={8} md={4} component={Card} className={styles.infected} key={val.id}>
                <CardContent>
                    <a href={`${HOST}/${str}`}>
                        <img src={`${HOST}/${val.image.url}`} width="100" height="100" />
                        <Typography color="textSecondary" gutterBottom>
                            {val.title}
                        </Typography>
                    </a>

                    <span dangerouslySetInnerHTML={{ __html: val.content.body }}></span>
                    <Typography color="textSecondary" gutterBottom>
                        投稿日: {date.toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Grid >);
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={1} justify="center">
                {arr}
            </Grid>
        </div >
    );
};

export default Articles
