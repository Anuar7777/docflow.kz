import styles from "./auth.module.css";

export default function AuthLayout({ children }) {
  return (
    <section className={styles.authSection}>
      <div className={styles.authLogo}>
        <img src="/logo.png" alt="logo" />
      </div>
      {children}
    </section>
  );
}
