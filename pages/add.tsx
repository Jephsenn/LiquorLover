import {
  faLocationDot,
  faStar,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { drink_types, locations, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import axios from "axios";
import { ChangeEvent, Component } from "react";
import Layout from "../src/components/layout";
import styles from "../styles/Add.module.css";
import Autocomplete, { AutocompleteItem } from "../src/components/autocomplete";
import Alert, { AlertType } from "../src/components/alert";

type Props = {
  drinks: AutocompleteItem[];
  locations: AutocompleteItem[];
};

type State = {
  location?: number;
  drink?: number;
  rating: number;
  hover: number;
  canSubmit: boolean;
  drinkInput: string;
  locationInput: string;
  alertText: string;
  alertType: AlertType;
};

export async function getServerSideProps(context: GetServerSideProps) {
  const prisma = new PrismaClient();
  let drinkTypes = await prisma.drink_types.findMany();
  let locs = await prisma.locations.findMany(); // TODO: Only find locations nearby

  let drinks: AutocompleteItem[] = [];
  let locations: AutocompleteItem[] = [];

  drinkTypes.forEach((d) => {
    drinks.push({ name: d.name, id: d.id });
  });

  locs.forEach((d) => {
    locations.push({ name: d.name, id: d.id });
  });

  return {
    props: {
      drinks,
      locations,
    },
  };
}

export default class Add extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rating: 0,
      hover: 0,
      canSubmit: false,
      drinkInput: "",
      locationInput: "",
      alertText: "",
      alertType: AlertType.Fail,
    };
  }

  addRecord = () => {
    const { location, drink, rating, canSubmit } = this.state;
    if (canSubmit) {
      axios
        .post("/api/add_drink", { locationId: location, drinkId: drink, rating })
        .then( (response) => {
          this.setState({locationInput: "", drinkInput: "", rating: 0})
          this.setState({alertText: "You added the drink successfully!", alertType: AlertType.Success})
        })
        .catch( (error) => {
          this.setState({alertText: "There was a problem adding your drink", alertType: AlertType.Fail})
          console.log(error);
        });
    }
  };

  setValue = (key: string, value: any) => {
    let obj: any = {};
    obj[key] = value;
    this.setState(obj);

    this.checkCanSubmit();
  };

  checkCanSubmit = () => {
    if (this.state.location && this.state.drink && this.state.rating) {
      this.setState({ canSubmit: true });
    }
  };

  render() {
    const { rating, canSubmit, locationInput, drinkInput, alertText, alertType } = this.state;
    const { locations, drinks } = this.props;

    return (
      <Layout page="add">
        <div className={styles.add}>
        <Alert text={alertText} clearAlert={()=>this.setState({alertText: ""})} alertType={alertType}/>
          <div className={styles.add_form}>
            <Autocomplete
              suggestions={locations}
              placeholder="Location Name"
              type="location"
              setValue={this.setValue}
              setUserInput={(s: string) => this.setState({locationInput: s})}
              userInput={locationInput}
            />
            <Autocomplete
              suggestions={drinks}
              placeholder="Drink Name"
              type="drink"
              setValue={this.setValue}
              setUserInput={(s: string) => this.setState({drinkInput: s})}
              userInput={drinkInput}
            />

            <div className={styles.rating_container}>
              <FontAwesomeIcon
                icon={faStar}
                className={rating > 0 ? styles.star_full : styles.star_empty}
                onMouseOver={() => this.setState({ hover: 1 })}
                style={{
                  color:
                    this.state.hover > 0
                      ? this.state.hover > 0
                        ? "#f4e285"
                        : "#9a9184"
                      : this.state.rating > 0
                      ? "#f4e285"
                      : "#9a9184",
                }}
                onMouseOut={() => this.setState({ hover: 0 })}
                onClick={() =>
                  this.setState({ rating: 1 }, () => this.checkCanSubmit())
                }
              />
              <FontAwesomeIcon
                icon={faStar}
                className={rating > 1 ? styles.star_full : styles.star_empty}
                onMouseOver={() => this.setState({ hover: 2 })}
                style={{
                  color:
                    this.state.hover > 0
                      ? this.state.hover > 1
                        ? "#f4e285"
                        : "#9a9184"
                      : this.state.rating > 1
                      ? "#f4e285"
                      : "#9a9184",
                }}
                onMouseOut={() => this.setState({ hover: 0 })}
                onClick={() =>
                  this.setState({ rating: 2 }, () => this.checkCanSubmit())
                }
              />
              <FontAwesomeIcon
                icon={faStar}
                className={rating > 2 ? styles.star_full : styles.star_empty}
                onMouseOver={() => this.setState({ hover: 3 })}
                style={{
                  color:
                    this.state.hover > 0
                      ? this.state.hover > 2
                        ? "#f4e285"
                        : "#9a9184"
                      : this.state.rating > 2
                      ? "#f4e285"
                      : "#9a9184",
                }}
                onMouseOut={() => this.setState({ hover: 0 })}
                onClick={() =>
                  this.setState({ rating: 3 }, () => this.checkCanSubmit())
                }
              />
              <FontAwesomeIcon
                icon={faStar}
                className={rating > 3 ? styles.star_full : styles.star_empty}
                onMouseOver={() => this.setState({ hover: 4 })}
                style={{
                  color:
                    this.state.hover > 0
                      ? this.state.hover > 3
                        ? "#f4e285"
                        : "#9a9184"
                      : this.state.rating > 3
                      ? "#f4e285"
                      : "#9a9184",
                }}
                onMouseOut={() => this.setState({ hover: 0 })}
                onClick={() =>
                  this.setState({ rating: 4 }, () => this.checkCanSubmit())
                }
              />
              <FontAwesomeIcon
                icon={faStar}
                className={rating > 4 ? styles.star_full : styles.star_empty}
                onMouseOver={() => this.setState({ hover: 5 })}
                style={{
                  color:
                    this.state.hover > 0
                      ? this.state.hover > 4
                        ? "#f4e285"
                        : "#9a9184"
                      : this.state.rating > 4
                      ? "#f4e285"
                      : "#9a9184",
                }}
                onMouseOut={() => this.setState({ hover: 0 })}
                onClick={() =>
                  this.setState({ rating: 5 }, () => this.checkCanSubmit())
                }
              />
            </div>
            <button
              className={styles.add_drink}
              disabled={!canSubmit}
              onClick={this.addRecord}
            >
              Add Drink
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}
