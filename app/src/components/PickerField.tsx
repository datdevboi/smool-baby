import * as React from "react";

import { Picker } from "react-native-ui-lib";
import { FieldProps } from "formik";

export class PickerField extends React.Component<
  FieldProps<any> & {
    value: string;
    options: any;
  }
> {
  onChange = (text: string) => {
    this.props.form.setFieldValue(this.props.field.name, text);
  };
  render() {
    const { field, form, value, options, ...props } = this.props;

    return (
      <Picker
        {...props}
        onChange={this.onChange}
        error={form.errors[field.name]}
        value={field.value}
      >
        {options.map(option => (
          <Picker.Item key={option} value={option} />
        ))}
      </Picker>
    );
  }
}
