import * as React from "react";
import { Input } from "react-native-elements";
import { FieldProps } from "formik";

export class InputField extends React.Component<
  FieldProps<any> & {
    name: string;
  }
> {
  onChangeText = (text: string) => {
    this.props.form.setFieldValue(this.props.name, text);
  };
  render() {
    const { field, form, ...props } = this.props;

    return (
      <Input {...props} onChangeText={this.onChangeText} value={field.value} />
    );
  }
}
