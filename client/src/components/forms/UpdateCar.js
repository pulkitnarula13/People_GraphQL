import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useDebugValue, useEffect, useState } from "react";
import { ADD_CAR, GET_PEOPLE, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
    const [updateCar] = useMutation(UPDATE_CAR);
    const [id, setId] = useState(props.id);
    const [make, setMake] = useState(props.make);
    const [model, setModel] = useState(props.model);
    const [personId, setPersonId] = useState(props.personId);
    const [price, setPrice] = useState(props.price);
    const [year, setYear] = useState(props.year);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const { Option } = Select;

    useEffect(() => {
        forceUpdate({});
    }, []);

    const { loading, error, data } = useQuery(GET_PEOPLE);
    if (loading) return "Loading...";
    if (error) return `Error ${error.message}`;

    const onFinish = (values) => {
        const { price, model, make, year, personId } = values;

        updateCar({
            variables: {
                price: parseFloat(price),
                model,
                make,
                year: parseInt(year),
                personId,
                id,
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
                    id,
                },
            },
        });

        props.onButtonClick();
    };

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value);
        switch (variable) {
            case "id":
                setId(value);
                break;
            case "make":
                setMake(value);
                break;
            case "model":
                setModel(value);
                break;
            case "personId":
                setPersonId(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "year":
                setYear(value);
                break;
            default:
                break;
        }
    };

    return (
        <Form
            form={form}
            name="update-car-form"
            onFinish={onFinish}
            layout="horizontal"
            size="large"
            style={{ margin: "40px" }}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                personId: personId,
            }}
        >
            <Form.Item name="year">
                <Input
                    placeholder="Year i.e. 2000"
                    allowClear
                    onChange={(e) =>
                        updateStateVariable("year", e.target.value)
                    }
                    value={year}
                />
            </Form.Item>
            <Form.Item
                name="make"
                rules={[
                    {
                        message: "Please input make of car",
                    },
                ]}
            >
                <Input
                    placeholder="Make i.e. Chevrolet"
                    allowClear
                    onChange={(e) =>
                        updateStateVariable("make", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item name="model">
                <Input
                    placeholder="Model i.e. Spark"
                    allowClear
                    onChange={(e) =>
                        updateStateVariable("model", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item name="price">
                <Input
                    placeholder="Price i.e. 5000"
                    allowClear
                    onChange={(e) => updateStateVariable("price", e)}
                />
            </Form.Item>

            <Form.Item
                name="personId"
                rules={[{ message: "Please select owner" }]}
            >
                <Select
                    placeholder="Select The Owner"
                    onChange={updateStateVariable(personId)}
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
                    <Button type="primary" htmlType="submit">
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    );
};

export default UpdateCar;
