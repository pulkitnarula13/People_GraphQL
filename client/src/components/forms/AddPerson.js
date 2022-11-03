import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";

const AddPerson = () => {
    const [id] = useState(uuidv4());
    const [addPerson] = useMutation(ADD_PERSON);
    const [form] = Form.useForm();
    const [, forcedUpdate] = useState();

    useEffect(() => {
        forcedUpdate({});
    }, []);

    const onFinish = (values) => {
        const { firstName, lastName } = values;

        addPerson({
            variables: {
                id,
                firstName,
                lastName,
                cars: [],
            },
            optimisticResponse: {
                __typename: "Mutation",
                addPerson: {
                    __type: "Person",
                    id,
                    firstName,
                    lastName,
                    cars: [],
                },
            },
            update: (proxy, { data: { addPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE });
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson],
                    },
                });
            },
        });
    };

    return (
        <Form
            form={form}
            name="add-person-form"
            onFinish={onFinish}
            layout="inline"
            size="large"
            style={{ marginBottom: "40px" }}
        >
            <Form.Item
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: "Please input first name",
                    },
                ]}
            >
                <Input placeholder="i.e. Michael" />
            </Form.Item>
            <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please input last name" }]}
            >
                <Input placeholder="i.e. Schumacher" />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form
                                .getFieldError()
                                .filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Person
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default AddPerson;
