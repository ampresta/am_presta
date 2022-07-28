import "./navbar.scss";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="fullpath">
          <span className="material-icons">home</span>
          <span className="path">/ {props.path}</span>
        </div>

        <div className="items">
          <span className="material-icons">account_circle</span>
          <span className="material-icons">notifications</span>
        </div>
      </div>
    </div>
  );
}
