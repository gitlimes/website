import styles from '../../styles/components/eastereggs/loadingbar.module.css';

export default function FakeCAPTCHA(context) {
  return (
    <div className={styles.egg}>
      <h2>Verify you're not a bot</h2>
      <p>fake captcha here</p>
      
    </div>
  );
}
