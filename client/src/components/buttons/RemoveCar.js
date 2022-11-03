import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { filter } from "lodash";
import { GET_PEOPLE, REMOVE_CAR } from "../../queries";

const RemoveCar = ({ id, personId, price, model, make, year }) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        update(proxy, { data: { removeCar } }) {
            const { people } = proxy.readQuery({ query: GET_PEOPLE });

            proxy.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: filter(people, (o) => {
                        return o.id !== removeCar.id;
                    }),
                },
            });
        },
    });

    const handleButtonClick = () => {
        let result = window.confirm(
            "Are you sure you want to delete this car?"
        );
        if (result) {
            removeCar({
                variables: {
                    id,
                    personId,
                },
                optimisticResponse: {
                    __typename: "Mutation",
                    removeCar: {
                        __typename: "Car",
                        id,
                        personId,
                        price,
                        model,
                        make,
                        year,
                    },
                },
            });
            console.log(personId);
        }
    };
    return (
        <DeleteOutlined
            key="delete"
            onClick={handleButtonClick}
            style={{ color: "red" }}
        />
    );
};

export default RemoveCar;
