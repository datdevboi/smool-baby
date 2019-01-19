import * as React from "react";

import { TextField } from "react-native-ui-lib";
import { FieldProps } from "formik";

export class InputField extends React.Component<
  FieldProps<any> & {
    name: string;
    value: string;
  }
> {
  onChangeText = (text: string) => {
    this.props.form.setFieldValue(this.props.field.name, text);
  };
  render() {
    const { field, form, value, ...props } = this.props;

    return (
      <TextField
        {...props}
        onChangeText={this.onChangeText}
        value={field.value}
      />
    );
  }
}
