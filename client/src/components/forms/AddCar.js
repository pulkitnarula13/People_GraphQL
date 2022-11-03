import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_PEOPLE } from "../../queries";

const AddCar = () => {
    const [addCarId] = useState(uuidv4());
    const [addCar] = useMutation(ADD_CAR);
    const [form] = Form.useForm();
    const [, forcedUpdate] = useState();
    const { Option } = Select;

    useEffect(() => {
        forcedUpdate({});
    }, []);

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return "Loading...";
    if (error) return `Error ${error.message}`;

    const onFinish = (values) => {
        const { price, model, make, year, personId } = values;

        addCar({
            variables: {
                price: parseFloat(price),
                model,
                make,
                year: parseInt(year),
                personId,
                addCarId,
            },
            optimisticResponse: {
                __typename: "Mutation",
                updateCar: {
                    __type: "Car",
                    price,
                    model,
                    make,
                    year,
                    personId,
                    addCarId,
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
            name="add-car-form"
            onFinish={onFinish}
            layout="horizontal"
            size="large"
            style={{ marginBottom: "40px" }}
        >
            <Form.Item
                name="year"
                rules={[
                    {
                        required: true,
                        message: "Please input year of car",
                    },
                ]}
            >
                <Input placeholder="Year i.e. 2000" />
            </Form.Item>
            <Form.Item
                name="make"
                rules={[
                    {
                        required: true,
                        message: "Please input make of car",
                    },
                ]}
            >
                <Input placeholder="Make i.e. Chevrolet" />
            </Form.Item>
            <Form.Item
                name="model"
                rules={[
                    {
                        required: true,
                        message: "Please input model of car",
                    },
                ]}
            >
                <Input placeholder="Model i.e. Spark" />
            </Form.Item>
            <Form.Item
                name="price"
                rules={[
                    {
                        required: true,
                        message: "Please price year of car",
                    },
                ]}
            >
                <Input placeholder="Price i.e. 5000" />
            </Form.Item>

            <Form.Item
                name="personId"
                rules={[{ required: true, message: "Please select owner" }]}
            >
                <Select
                    placeholder="Select The Owner"
                    // onChange={onOwnerChange}
                    allowClear
                >
                    {data.people.map(({ id, firstName, lastName }) => (
                        <Option value={id} key={id}>
                            {firstName} {lastName}
                        </Option>
                    ))}
                </Select>
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
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default AddCar;
