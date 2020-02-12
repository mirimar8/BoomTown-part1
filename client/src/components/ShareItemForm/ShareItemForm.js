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
import { ADD_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../../apollo/queries';
import { graphql, compose } from 'react-apollo';
import { Redirect } from 'react-router';

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

  createTags = (selectedTags) => {
    const { tags } = this.props;
    let out = [];

    tags.map(tag => {
      if (selectedTags.indexOf(tag.title) !== -1) {
        let { id, title } = tag;
        out.push({ id, title })
      }
      return out;
    })
    return out;
  }


  render() {
    const { classes, tags } = this.props;
    const addItemMutation = this.props.addItemMutation;

    if (this.state.redirect) {
      return <Redirect to='/items' />
    }

    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => (
          <Form
            onSubmit={resetPreview, (values) => {
              this.createTags(this.state.selectedTags);
              const mutationInput = {
                variables: {
                  item: {
                    title: values.title,
                    description: values.description,
                    tags: this.createTags(this.state.selectedTags),
                    imageurl: values.imageurl
                  }
                }
              }
              addItemMutation(mutationInput).then(() => {
                resetPreview();
                this.setState({
                  redirect: true
                })
              });
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
                          label="SELECT AN IMAGE"
                          fullWidth
                          variant="outlined"
                          inputProps={{
                            autoComplete: 'off',
                            ...input
                          }}
                          value={state.item.imageurl}
                        />
                      </div>
                    )}
                  />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                  <Field
                    name="title"
                    render={({ input }) => (
                      <div>
                        <TextField
                          type="text"
                          margin="normal"
                          label="Name your item"
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
                    render={({ input }) => (
                      <div>
                        <TextField
                          type="text"
                          margin="normal"
                          label="Describe your item"
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
                      < div >
                        <InputLabel>Add some tags</InputLabel>
                        <Select
                          fullWidth
                          multiple
                          value={this.state.selectedTags}
                          onChange={(event) => {
                            this.setState({
                              selectedTags: event.target.value
                            })
                            updatePreview({ tags: this.createTags(event.target.value) })
                          }}
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
                  onSubmit={handleSubmit}
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

const refetchQueries = [
  {
    query: ALL_ITEMS_QUERY,
  },
];

export default compose(
  graphql(ADD_ITEM_MUTATION, {
    options: {
      refetchQueries,
    },
    name: 'addItemMutation'
  }),
  withStyles(styles),
)(ShareForm);

