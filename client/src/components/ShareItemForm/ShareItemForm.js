import React, { Component } from 'react';
import { Form, Field } from "react-final-form";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



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
                    <label>Name your item</label>
                    <TextField
                      type="text"
                      placeholder="Name your item"
                      value={input.value}
                      {...input}
                    />
                  </div>
                )}
              />

              <Button type="submit" variant="outlined">SHARE</Button>


            </div>
          </ form>
        )}

      >
      </Form>
    );
  }
}

export default ShareForm;
