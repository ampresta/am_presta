import "./sidebarlink.scss"

const SidebarLink = (props) => {
  return (
    <div className="SidebarLinkLi">
      <a href={props.to}>
        <span className="material-icons">{props.icon}</span>
        <span>{props.text}</span>
      </a>
    </div>
  );
};


export default SidebarLink;
