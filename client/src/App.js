import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Title from "./components/layout/Title";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCar from "./components/forms/AddCar";
import AddPerson from "./components/forms/AddPerson";
import People from "./components/lists/People";
import ShowPerson from "./components/listItems/ShowPerson";
import { GET_CARS } from "./queries";
import { useQuery } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const Home = () => {
  useQuery(GET_CARS);
  return (
    <div>
      <Title />
      <AddPerson />
      <AddCar />
      <People />
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showPerson/:id" element={<ShowPerson />} />
        </Routes>
      </BrowserRouter>
    </div>
  </ApolloProvider>
);

export default App;
