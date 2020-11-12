import React from 'react';
import styles from "./index.module.css";
import HOST from '../../appconf';
import { Card, CardContent, CardMedia, Typography, Grid, CardActionArea, Link } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { useSelector, useDispatch } from "react-redux";
import { selectArticles } from "./articleSlice";
import { selectPage, fetchAsyncSetPage } from "./pageSlice";
import Pagination from '@material-ui/lab/Pagination';
import { truncateString } from "../common/common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 245,
    },
    media: {
      height: 0,
      paddingTop: '56.25%',
    },
    paginate: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

let getArticle = (val: any, classes: any) => {

  if (val == null) {
    return (
      < Grid item xs={4} sm={4} md={3} component={Typography} className={styles.none}  >
      </Grid>
    );
  }

  let str = "articles/show/" + val.id;
  let date = new Date(val.created_at)

  let img_url;
  if (val.image.url.substr(0, 4) !== "http") {
    img_url = HOST + val.image.url;
  } else {
    img_url = val.image.url;
  }

  return (
    < Grid item xs={8} sm={4} md={3} component={Card} className={styles.article} key={val.id} >
      <CardActionArea >
        <Link href={`${HOST}/${str}`} >
          <CardMedia
            className={classes.media}
            image={`${img_url}`}
            title="Article Thumbnail"
          />
          <CardContent >
            <Grid container spacing={0} direction="row" justify="flex-end">
              <Grid item xs container direction="column" spacing={0}>
                <Grid item>
                  <Typography variant="subtitle1" color="textSecondary" >
                    {truncateString(val.title, 23)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <div className={styles.postday}>
              <Typography variant="overline" color="textSecondary" >
                <AccessTimeIcon fontSize="inherit" /> {date.toLocaleDateString()}
              </Typography>
            </div>
          </CardContent>
        </Link>
      </CardActionArea >
    </Grid >
  );
}

const Articles: React.FC = () => {
  const articles = useSelector(selectArticles);
  const page: number = useSelector(selectPage);

  const classes = useStyles();
  const [rowsPerPage] = React.useState(12);
  const dispatch = useDispatch();

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(fetchAsyncSetPage(newPage))
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={0} justify="center" key="1">
        {(rowsPerPage > 0
          ? articles.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
          : articles
        ).map((article) => (
          getArticle(article, classes)
        ))}
      </Grid>
      <div className={classes.paginate}>
        <Pagination
          count={Math.ceil(articles.length / rowsPerPage)}
          page={page}
          defaultPage={1}
          onChange={handleChangePage}
        />
      </div>
    </div >
  );
};

export default Articles
