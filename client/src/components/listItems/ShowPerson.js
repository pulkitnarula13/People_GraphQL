import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../../queries";
import { List, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import Car from "../listItems/Car";

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

const ShowPerson = () => {
  const styles = getStyles();
  const params = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS(params.id));
  const navigate = useNavigate();
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Card style={styles.card}>
      {data.person.firstName} {data.person.lastName}
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        <Button type="primary" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
        {console.log(data)}
        {data.cars.map(({ id, year, make, model, price, personId }) => (
          <List.Item key={id}>
            <Car
              key={id}
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
            />
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default ShowPerson;
