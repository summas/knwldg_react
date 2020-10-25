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

let truncateTitle = (title: String, len: number) => {
  return (title.length <= len ? title : (title.substr(0, len) + "..."));
};

let getArticle = (val: any, classes: any) => {

  if (val == null) {
    return (
      < Grid item xs={12} md={3} component={Typography} className={styles.none}  >
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
  console.log(img_url)

  return (
    < Grid item xs={12} md={3} component={Card} className={styles.article} key={val.id} >
      <CardActionArea >
        <Link href={`${HOST}/${str}`} >
          <CardMedia
            className={classes.media}
            image={`${img_url}`}
            title="Contemplative Reptile"
          />
          <CardContent >
            <Grid container spacing={0} direction="row" justify="flex-end">
              {/* <Grid item>
                <img src={`${img_url}`} width="150" height="120" alt="" />
              </Grid> */}
              <Grid item xs container direction="column" spacing={0}>
                <Grid item>
                  <Typography variant="subtitle1" color="textSecondary" >
                    {truncateTitle(val.title, 23)}
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
  const [rowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    dispatch(fetchAsyncSetPage(newPage))
  };

  let arr = [];
  let num: number = 0;
  for (let n in articles) {
    let val = articles[n];
    let val2 = articles[parseInt(n) + 1];
    let val3 = articles[parseInt(n) + 2];
    if (parseInt(n) % 3 === 0) {
      arr[num] = [val, val2, val3];
      num = num + 1;
    }
  }

  // for (let n in articles) {
  //   let val = articles[n];
  //   let val2 = articles[parseInt(n) + 1];
  //   if (parseInt(n) % 2 === 0) {
  //     arr[num] = [val, val2];
  //     num = num + 1;
  //   }
  // }

  return (
    <div className={styles.container}>
      {(rowsPerPage > 0
        ? arr.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
        : arr
      ).map((article) => (
        <Grid container spacing={0} justify="center" key={article[0].id}>
          {getArticle(article[0], classes)}
          {getArticle(article[1], classes)}
          {getArticle(article[2], classes)}
        </Grid>
      ))}

      <div className={classes.paginate}>
        <Pagination
          count={Math.ceil(arr.length / rowsPerPage)}
          page={page}
          defaultPage={1}
          onChange={handleChangePage}
        />
      </div>
    </div >
  );
};

export default Articles
