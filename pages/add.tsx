import { faLocationDot, faStar, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  rating: number;
  hover: number;
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
      rating: 0,
      hover: 0,
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
    const { locationText, drinkText, rating } = this.state;
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
          <div className={styles.rating_container}>
            <FontAwesomeIcon
              icon={faStar}
              className={rating > 0 ? styles.star_full : styles.star_empty}
              onMouseOver={() => this.setState({hover: 1})}
              style={{
                color: this.state.hover > 0 ? "#f4e285" : "#9a9184"
              }}
              onMouseOut={() => this.setState({hover: 0})}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={rating > 1 ? styles.star_full : styles.star_empty}
              onMouseOver={() => this.setState({hover: 2})}
              style={{
                color: this.state.hover > 1 ? "#f4e285" : "#9a9184"
              }}
              onMouseOut={() => this.setState({hover: 0})}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={rating > 2 ? styles.star_full : styles.star_empty}
              onMouseOver={() => this.setState({hover: 3})}
              style={{
                color: this.state.hover > 2 ? "#f4e285" : "#9a9184"
              }}
              onMouseOut={() => this.setState({hover: 0})}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={rating > 3 ? styles.star_full : styles.star_empty}
              onMouseOver={() => this.setState({hover: 4})}
              style={{
                color: this.state.hover > 3 ? "#f4e285" : "#9a9184"
              }}
              onMouseOut={() => this.setState({hover: 0})}
            />
            <FontAwesomeIcon
              icon={faStar}
              className={rating > 4 ? styles.star_full : styles.star_empty}
              onMouseOver={() => this.setState({hover: 5})}
              style={{
                color: this.state.hover > 4 ? "#f4e285" : "#9a9184"
              }}
              onMouseOut={() => this.setState({hover: 0})}
            />
          </div>
          <button onClick={this.addRecord}>Add Drink</button>
        </div>
      </Layout>
    );
  }
}
