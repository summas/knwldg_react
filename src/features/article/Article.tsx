import React from 'react';
import styles from "./index.module.css";
import HOST from '../../appconf';
// import CountUp from "react-countup";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

// import { GiHastyGrave } from "react-icons/gi";
// import { MdLocalHospital } from "react-icons/md";
// import { AiFillLike } from "react-icons/ai";

import { useSelector } from "react-redux";
import { selectArticles, fetchAsyncGetArticles } from "./showSlice";

// import Articles from './Articles';

const Article: React.FC = () => {
    const articles = useSelector(selectArticles);

    // let arr = [];
    console.log(fetchAsyncGetArticles);
    return (

        <Grid item xs={8} md={4} component={Card} className={styles.infected}>
            <CardContent>
                <div> {articles[10]}</div>
                <div> {fetchAsyncGetArticles}</div>

                {/* <div> {articles[0].id}</div>
                <div> {articles[0].id}</div> */}

                <Typography color="textSecondary" gutterBottom>
                    <span dangerouslySetInnerHTML={{ __html: articles[10] }}></span>
                    {/* <span dangerouslySetInnerHTML={{ __html: articles[0].content }}></span> */}
                </Typography>
            </CardContent>
            <Typography color="textSecondary" gutterBottom>
                <span dangerouslySetInnerHTML={{ __html: articles[10] }}></span>
                {/* <span dangerouslySetInnerHTML={{ __html: articles[0].content }}></span> */}
            </Typography>
        </Grid >);

    // return (
    //     <div className={styles.container}>
    //         <Grid container spacing={1} justify="center">
    //             {arr}
    //         </Grid>
    //     </div >
    // );

};

export default Article
