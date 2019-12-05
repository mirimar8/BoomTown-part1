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
import { ADD_ITEM_MUTATION } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';

// import { FormSpy } from 'react-final-form'



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


class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      selectedTags: []
    };
  }


  render() {
    const { classes, tags } = this.props;
    const addItemMutation = this.props.addItemMutation;

    const handleChange = event => {
      console.log("hi");
      this.setState({
        selectedTags: event.target.value

      })
      console.log(this.state);
    };

    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => (

          <Form
            onSubmit={resetPreview, (values) => {
              const selectedTags = this.state.selectedTags;
              const mutationInput = {
                variables: {
                  item: {
                    title: values.title,
                    description: values.description,
                    tags: [{ id: 1, title: "tags.title" }]
                  }
                }
              }

              console.log("addingitem", mutationInput);
              console.log(values, selectedTags);
              addItemMutation(mutationInput);

            }}
            validate={updatePreview}
            render={({ handleSubmit, form, invalid, pristine, values }) => (
              <form
                onSubmit={handleSubmit}
                className={classes.shareForm}
              >
                <h1 className={classes.heading}> Share. Borrow. Prosper. </h1>

                <FormControl fullWidth className={classes.formControl}>
                  <Field
                    name="imageurl"
                    render={({ input }) => (
                      <div>

                        <TextField
                          className={classes.imageInput}
                          type="text"
                          margin="normal"
                          label="SELECT AN IMAGE"//  use formSpy
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            autoComplete: 'off',
                            ...input
                          }}
                          value={state.item.imageurl}
                        />

                        {/* <Button
                          variant="contained"
                          margin="normal"
                          color="primary"
                          fullWidth
                          value={input.value}

                        >
                          SELECT AN IMAGE
                          </Button> */}
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
                          label={state.item.title}
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
                          label={state.item.description}
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
                    render={({ input }) => (

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
                          {tags && tags.map(tag => (
                            <MenuItem key={tag.id} value={tag.title}>

                              <Checkbox />
                              <ListItemText primary={tag.title} />
                            </MenuItem>
                          ))}

                        </Select>
                      </div>
                    )}
                  />
                </FormControl>

                <Button className={classes.shareButton}
                  type="submit"
                  variant="outlined"
                  disabled={pristine || invalid}

                // onClick={() => form.reset()}

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


export default compose(
  graphql(ADD_ITEM_MUTATION, {

    name: 'addItemMutation'
  }),
  withStyles(styles),
)(ShareForm);

