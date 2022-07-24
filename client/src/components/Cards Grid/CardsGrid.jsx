import Card from "../card/Card";
import "./cardsgrid.scss";

export default function CardsGrid() {
  return (
    <div className="cardsGrid">
      <div className="wrapper">
        <Card
          title="Requests"
          value="500"
          percentage="3"
          gain={true}
          color="red"
          icon="email"
        />
        <Card
          title="Sessions"
          value="240"
          percentage="3"
          gain={false}
          color="lightgreen"
          icon="event"
        />
        <Card
          title="Requests"
          value="240"
          percentage="3"
          gain={true}
          color="lightblue"
          icon="email"
        />
        <Card
          title="Requests"
          value="240"
          percentage="3"
          gain={true}
          color="red"
          icon="email"
        />
      </div>
    </div>
  );
}
