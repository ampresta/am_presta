import SidebarLink from "./SidebarLink/SidebarLink";
import SidebarLogo from "./logo/SidebarLogo";
import "./sidebar.scss";

const Sidebar = () => {
  const links = [
    { icon: "dashboard", to: "/", text: "Dashboard" },
    { icon: "insert_invitation", to: "", text: "Requests" },
    { icon: "event_available", to: "", text: "Session" },
    { icon: "business", to: "", text: "Departements" },
    { icon: "groups", to: "", text: "Learners" },
    { icon: "class", to: "", text: "Courses" },
    { icon: "cases", to: "", text: "Partners" },
  ];

  return (
    <div className="SidebarWrapper">
      <SidebarLogo />
      <div className="links">
        <div className="section">
          {links.map((link) => (
            <SidebarLink
              key={links.indexOf(link)}
              icon={link.icon}
              to={link.to}
              text={link.text}
            />
          ))}
        </div>

        <div className="section">
          <SidebarLink icon="settings" to="" text="Settings" />
          <SidebarLink icon="logout" to="/register" text="Log out" />
        </div>
      </div>
    </div>
  );
};

/* Logo */

export default Sidebar;
