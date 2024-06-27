import classes from './StartingPageContent.module.css';
import logo from '../../utils/BM-LOGO.png'
const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
        <h1>!ברוכים הבאים לאתר</h1>
        <p>כאן תוכלו להגיש בקשות שונות למערך ולקבל מענה בהקדם</p>
        <img src={logo} alt='סמל בטחון מידע'/>
    </section>
  );
};

export default StartingPageContent;
