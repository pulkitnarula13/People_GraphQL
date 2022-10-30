import RemovePerson from "../buttons/RemovePerson";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { List, Button, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdatePerson from "../forms/UpdatePerson";
import { GET_CARS } from "../../queries";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const Person = (props) => {
  const styles = getStyles();
  const [id] = useState(props.id);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);
  const { loading, error, data } = useQuery(GET_CARS(props.id));
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
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
    <div>
      {editMode ? (
        <UpdatePerson
          id={props.id}
          firstName={props.firstName}
          lastName={props.lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined ke="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
          style={styles.card}
        >
          {firstName} {lastName}
        </Card>
      )}
      <Button
        type="primary"
        onClick={() => navigate(`/ShowPerson/${props.id}`)}
      >
        Learn More
      </Button>
    </div>
  );
};

export default Person;
