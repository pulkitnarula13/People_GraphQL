import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../../queries";
import { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [year, setYear] = useState(props.year);
  const [make, setMake] = useState(props.make);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(props.price);
  const [personId, setPersonId] = useState(props.personId);
  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  var yearChanged = props.year;
  var makeChanged = props.make;
  var modelChanged = props.model;
  var priceChanged = props.price;
  var personIdChanged = props.personId;

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
    });

    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    switch (variable) {
      case "year":
        setYear(value);
        break;
      case "make":
        setMake(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "personId":
        setPersonId(value);
      default:
        break;
    }
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="lnline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input the year!" }]}
      >
        <Input
          placeholder="i.e 2020"
          onChange={(e) => (yearChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input the maker" }]}
      >
        <Input
          placeholder="i.e Toyota"
          onChange={(e) => (makeChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input the model" }]}
      >
        <Input
          placeholder="i.e Corolla"
          onChange={(e) => (modelChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input the price" }]}
      >
        <Input
          placeholder="i.e $10000"
          onChange={(e) => (priceChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please input the personId" }]}
      >
        <Input
          placeholder="i.e 1"
          onChange={(e) => (personIdChanged = e.target.value)}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="sumbit"
            disabled={
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
            onClick={() => {
              updateStateVariable("year", yearChanged);
              updateStateVariable("make", makeChanged);
              updateStateVariable("model", modelChanged);
              updateStateVariable("price", priceChanged);
              updateStateVariable("personId", personIdChanged);
            }}
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
