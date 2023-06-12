import styles from "./Home.module.css"
import { Header } from "@/containers";

const Home = () => {
    return(
        <div className={styles.home}>
            <Header />
        </div>
    )
}

export default Home;