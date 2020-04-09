import React from 'react';

/*
const NewTemplate = () => {

  return (
    <div className="new-template">
      <h1>NewTemplate</h1>
    </div>
  );
};
*/


//import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const NewTemplate = () => {
    const Button = styled.button`
        background: #E5C1EE;
        border-radius: 3px;
        border: solid #DBB7E4;
        color: #33153A;
        font-size: .5em;
        margin: 0 1em;
        padding: 0.25em 1em;
    `

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));

    export default function MultilineTextFields() {
        const classes = useStyles();
        const [value, setValue] = React.useState('Controlled');

        const handleChange = (event) => {
            setValue(event.target.value);
        };

        return (
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="standard-textarea"
                        label="Name"
                        placeholder="Placeholder"
                        multiline
                    />
                    <Button>Done</Button>
                </div>
            </form>
        );
    }

};

export default NewTemplate;
