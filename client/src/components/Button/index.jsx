import styles from "./Button.module.css";

export default function Button({ text, size }) {
  return <button className={styles.button}>{text}</button>;
}
