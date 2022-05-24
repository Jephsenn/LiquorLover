import { drink_types, locations } from "@prisma/client";
import axios from "axios";
import { ChangeEvent, Component } from "react";
import Layout from "../src/components/layout";
import styles from "../styles/Add.module.css";

type Props = {};

type State = {
  locationText: string;
  drinkText: string;
  location?: locations;
  drink?: drink_types;
};

export default class Add extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      locationText: "",
      drinkText: "",
    };
  }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    // Weird typescript hack to use element name as key for object
    let obj: any = {};
    obj[e.currentTarget.name] = e.currentTarget.value;

    this.setState(obj);
  };

  addRecord = () => {
    const { location, drink } = this.state;
    axios
      .post("/api/add_drink", { locationId: 1, drinkId: 1, rating: 3 })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { locationText, drinkText } = this.state;
    return (
      <Layout page="add">
        <div className={styles.add}>
          <input
            type="text"
            name="locationText"
            placeholder="Location Name"
            value={locationText}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="drinkText"
            placeholder="Drink Name"
            value={drinkText}
            onChange={this.onChange}
          />
          <button onClick={this.addRecord}>Add Drink</button>
        </div>
      </Layout>
    );
  }
}
