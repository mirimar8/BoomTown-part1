import React, { Component } from 'react';
import { Form, Field } from "react-final-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ItemPreviewContext } from '../../context/ItemPreviewProvider'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';


const onValidate = values => { console.log(values) };
const onFormSubmit = values => { console.log(values) };



class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => (
          <Form
            onSubmit={onFormSubmit}
            validate={onValidate}
            render={({ handleSubmit, form }) => (
              <form
                onSubmit={handleSubmit}
                className={classes.shareForm}
              >
                <h1 className={classes.heading}> Share. Borrow. Prosper. </h1>

                <FormControl fullWidth className={classes.formControl}>
                  <Field
                    name="imageurl"
                    render={({ input, meta }) => (
                      <div>
                        <Button
                          variant="contained"
                          margin="normal"
                          color="primary"
                          fullWidth
                          inputProps={{
                            autoComplete: 'off',
                            ...input
                          }}
                          value={input.value}
                        >
                          SELECT AN IMAGE
                          </Button>
                      </div>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                  <Field
                    name="itemname"
                    render={({ input, meta }) => (
                      <div>
                        <TextField
                          type="text"
                          margin="normal"
                          label={state.item.title} //  use formSpy
                          fullWidth
                          inputProps={{
                            autoComplete: 'off',
                            ...input
                          }}
                          value={input.value}
                        />
                      </div>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                  <Field
                    name="description"
                    render={({ input, meta }) => (
                      <div>
                        <TextField
                          type="text"
                          margin="normal"
                          label={state.item.description} // use formSpy
                          fullWidth
                          inputProps={{
                            autoComplete: 'off',
                            ...input
                          }}
                          value={input.value}
                        />
                      </div>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                  <Field
                    name="tags"
                    render={({ input, meta }) => (
                      <div>
                        <InputLabel>Add some tags</InputLabel>
                        <Select
                          fullWidth
                          multiple
                          value={input.value}
                          // onChange={handleChange}
                          input={<Input />}
                          renderValue={selected => selected.join(', ')}
                        // MenuProps={MenuProps}

                        >
                          {/* {names.map(name => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={personName.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))} */}
                        </Select>
                      </div>
                    )}
                  />
                </FormControl>

                <Button className={classes.shareButton}
                  type="submit"
                  variant="outlined"

                >SHARE
                </Button>

              </form>
            )}

          >
          </Form>
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default withStyles(styles)(ShareForm);
