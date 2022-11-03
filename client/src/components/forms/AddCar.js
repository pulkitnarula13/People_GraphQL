import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Button, Form, Input, Select } from "antd"
import { v4 as uuidv4 } from "uuid"
import { ADD_CAR, GET_PEOPLE } from "../../queries"

const AddCar = () => {
    const [id] = useState(uuidv4());
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
                id,
                year: parseInt(year),
                make,
                model,
                price: parseFloat(price),
                personId,
            },
            // optimisticResponse: {
            //     __typename: "Mutation",
            //     updateCar: {
            //         __type: "Car",
            //         id,
            //         year,
            //         make,
            //         model,
            //         price,
            //         personId,
            //     },
            // },
            update: (proxy, { data: { addPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE });
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson],
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name="add-car-form"
            layout="inline"
            onFinish={onFinish}
            size="large"
            style={{ marginBottom: "40px" }}
        >
            <Form.Item
                name="year"
                rules={[{ required: true, message: "Please input year of car!"}]}
            >
                <Input placeholder="Year" />
            </Form.Item>
            <Form.Item
                name="make"
                rules={[{ required: true, message: "Please input make of car!"}]}
            >
                <Input placeholder="Make" />
            </Form.Item>
            <Form.Item
                name="model"
                rules={[{ required: true, message: "Please input model of car!"}]}
            >
                <Input placeholder="Model" />
            </Form.Item>
            <Form.Item
                name="price"
                rules={[{ required: true, message: "Please input price of car!"}]}

            >
                <Input placeholder="Price" />
            </Form.Item>

            <Form.Item
                name="personId"
                rules={[{ required: true, message: "Please select owner of the car!" }]}
            >
                <Select
                    placeholder="Select a person"
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
