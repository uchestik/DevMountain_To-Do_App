import React from 'react';
import {Link} from 'react-router-dom'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import lightBlue from '@material-ui/core/colors/lightBlue';
import styles from '../../utils/styles/todoHeaderStyles';

const theme = createMuiTheme({
    palette: {
      primary: lightBlue
    },
});

const TodoHeader = (props) => {
    const { classes } = props;
    return (
        <MuiThemeProvider theme={theme}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography
                        className={classes.title}
                        variant='headline'
                        component='h2'
                    >
                        TO-DO:
                    </Typography>
                    <CardActions className={classes.action}>
                        <Link className={classes.link} to='/form'>
                            <Button 
                                className={classes.link}
                                variant='contained'
                                color='primary'
                            >
                                Add new To-do
                            </Button>
                        </Link>
                    </CardActions>
                </CardContent>
            </Card>
        </MuiThemeProvider>
    )
}

export default withStyles(styles)(TodoHeader);