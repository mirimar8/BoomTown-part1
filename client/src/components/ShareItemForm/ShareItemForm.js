import React, { Component } from 'react';
import { Form, Field } from "react-final-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ItemPreviewContext } from '../../context/ItemPreviewProvider'


const onValidateFunc = values => { console.log(values) };
const onFormSubmitFunc = values => { console.log(values) };

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <ItemPreviewContext.Consumer>
        {({ state, updatePreview, resetPreview }) => (
          <Form
            onSubmit={onFormSubmitFunc}
            validate={onValidateFunc}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <h2> Share. Borrow. Prosper </h2>
                <div>

                  <Field
                    name="itemname"
                    render={({ input, meta }) => (
                      <div>
                        <label>{state.item.title}</label>
                        <TextField
                          type="text"
                          placeholder="Name your item" // will change to {state.title} and use formSpy
                          value={input.value}
                          {...input}
                        />
                      </div>
                    )}
                  />

                  <Button type="submit" variant="outlined">SHARE</Button>


                </div>
              </form>
            )}

          >
          </Form>
        )}
      </ItemPreviewContext.Consumer>
    );
  }
}

export default ShareForm;
