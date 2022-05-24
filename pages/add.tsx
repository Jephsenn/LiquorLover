import { drink_types, locations, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ChangeEvent, Component } from "react";
import Layout from "../src/components/layout";
import styles from "../styles/Add.module.css";
import Autocomplete from "../src/components/autocomplete";

type Props = {
  drinkNames: string[];
};

type State = {
  locationText: string;
  drinkText: string;
  location?: locations;
  drink?: drink_types;
};


export async function getServerSideProps(context: GetServerSideProps) {
  const prisma = new PrismaClient();
  let drinkTypes = await prisma.drink_types.findMany();
  let drinkNames: string[] = [];

  drinkTypes.forEach((d) => {
    drinkNames.push(d.name);
  })

  return {
    props: {
      drinkNames,
    },
  };
}

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
        {/*  <input
            type="text"
            name="locationText"
            placeholder="Location Name"
            value={locationText}
            onChange={this.onChange}
    />*/}
          <Autocomplete suggestions={["Woodys", "Roofies", "Owens"]} placeholder="Location Name"/>
          {/*<input
            type="text"
            name="drinkText"
            placeholder="Drink Name"
            value={drinkText}
            onChange={this.onChange}
  />*/}
          <Autocomplete suggestions={this.props.drinkNames} placeholder="Drink Name"/>
          <button onClick={this.addRecord}>Add Drink</button>
        </div>
      </Layout>
    );
  }
}
