import "./card.scss";

export default function Card(props) {
  const handleSign = () => (props.gain ? "+" : "-");
  const handleClassName = () => (props.gain ? "gain" : "loss");

  console.log(props);
  return (
    <div className="card">
      <div className="card-body">
        <span className="title">Actual {props.title}</span>
        <h1 className="value">{props.value}</h1>
        <hr />
        <div className="description">
          <h4>
            <span className={handleClassName()}>{handleSign()}3%</span> than
            last month
          </h4>
        </div>
      </div>
      <div className="card-icon" style={{ background: props.color }}>
        <span className="material-icons">{props.icon}</span>
      </div>
    </div>
  );
}
