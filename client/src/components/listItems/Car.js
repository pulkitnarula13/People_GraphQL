import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Card } from "antd";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const Car = (props) => {
    const [id, setId] = useState(props.car.id);
    const [year, setYear] = useState(props.car.year);
    const [make, setMake] = useState(props.car.make);
    const [model, setModel] = useState(props.car.model);
    const [price, setPrice] = useState(props.car.price);
    const [personId, setPersonId] = useState(props.car.personId);

    const [editModeCar, setEditModeCar] = useState(false);

    const handleButtonCarClick = () => {
        setEditModeCar(!editModeCar);
    };

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case "id":
                setId(value);
                break;
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
                break;
            
            default:
                break;
        }
    };

    return (
        <div>
            {editModeCar ? (
                <UpdateCar
                    style={{ marginTop: 20 }}
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    
                    onButtonClick={handleButtonCarClick}
                    updateStateVariable={updateStateVariable}
                />
            ) : (
                <Card
                    actions={[
                        <EditOutlined
                            key="edit"
                            onClick={handleButtonCarClick}
                        />,
                        <RemoveCar
                            id={id}
                            year={year}
                            make={make}
                            model={model}
                            price={price}
                            personId={personId}
                        />,
                    ]}
                    style={{
                        marginTop: 15,
                        width: "500px",
                    }}
                    type="inner"
                >
                    {year} {make} {model} -&gt; ${price}
                </Card>
            )}
        </div>
    );
};

export default Car;
