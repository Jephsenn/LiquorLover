import styles from "../styles/Home.module.css";
import Layout from "./components/layout";

type Props = {};

function Home(props: Props) {
  return (
    <Layout page="home">
      <p>
        This is the home page. It will show off the cocktails your friends have
        recently tried with their ratings, descriptions, and pictures.
      </p>
    </Layout>
  );
}

export default Home;
