import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
const { Option } = Select;

const AddCar = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [personId, setPersonId] = useState("");

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let options = data.people.map((person) => (
    <Option key={person.id} value={person.id}>
      {person.firstName} {person.lastName}
    </Option>
  ));

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({
          query: GET_CARS,
        });
        console.log("allcars", data);
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            allCars: [...data.allCars, addCar],
          },
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="add-car-form"
      layout="inline"
      size="large"
      style={{ marginBottom: "40px" }}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year" }]}
      >
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input the brand" }]}
      >
        <Input placeholder="Brand" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the price" }]}
      >
        <InputNumber
          defaultValue={1000}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please input the person id" }]}
      >
        <Select
          defaultValue="PersonID"
          style={{
            width: 120,
          }}
          onChange={(value) => {
            if (value != personId || value !== "") {
              setPersonId(value);
            }
          }}
        >
          {options}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched("year") ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
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
