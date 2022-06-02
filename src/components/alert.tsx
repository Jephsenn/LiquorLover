import styles from "../../styles/Alert.module.css";

type Props = {
    text?: string;
    clearAlert: Function;
    alertType: AlertType; 
}

export enum AlertType {
    Success = '#00C853',
    Fail = '#B00020',
}

export default function Alert(props: Props){

    if(props.text){
        return (
            <div style={{backgroundColor: props.alertType}} className={styles.alert_box}>
                <div className={styles.text}>{props.text}</div>
                <div className={styles.close_button} onClick={()=>props.clearAlert()}>X</div>
            </div>
        );
    } else {
        return (<div/>);
    }
}