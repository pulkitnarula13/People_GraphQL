import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = (props) => {
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  var firstNameChanged = props.firstName;
  var lastNameChanged = props.lastName;

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });

    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="lnline"
      onFinish={onFinish}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
      }}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          placeholder="i.e John"
          onChange={(e) => (firstNameChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input
          placeholder="i.e Smith"
          onChange={(e) => (lastNameChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="sumbit"
            disabled={
              (!form.isFieldTouched("firstName") &&
                !form.isFieldTouched("lastName")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
            onClick={() => {
              updateStateVariable("firstName", firstNameChanged);
              updateStateVariable("lastName", lastNameChanged);
            }}
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdatePerson;
