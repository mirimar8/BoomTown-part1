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
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

// import { FormSpy } from 'react-final-form'

const handleChange = event => {
  this.setState({
    selectedTags: event.target.value
  })
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const onValidate = values => { console.log(values) };
// const onFormSubmit = values => { console.log(values) };

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tags: []
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => (

          < Form
            onSubmit={resetPreview}
            validate={updatePreview}
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
                    name="title"
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
                    render={({ input, tags }) => (

                      <div>
                        <InputLabel>Add some tags</InputLabel>
                        <Select
                          fullWidth
                          multiple
                          value={this.state.selectedTags}
                          onChange={handleChange}
                          input={<Input />}
                          renderValue={selected => selected.join(', ')}
                          MenuProps={MenuProps}

                        >
                          {tags &&
                            tags.map(tag => (
                              <MenuItem key={tag} value={tag}>
                                <Checkbox checked={this.state.selectedTags.indexOf(tag) > -1} />
                                <ListItemText primary={tag.title} />
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </div>
                    )}
                  />
                </FormControl>

                <Button className={classes.shareButton}
                  type="submit"
                  variant="outlined"
                  onClick={() => form.reset()}

                >SHARE
                </Button>

              </form>
            )
            }

          >
          </Form >
        )
        }
      </ItemPreviewContext.Consumer >
    );
  }
}

export default withStyles(styles)(ShareForm);
