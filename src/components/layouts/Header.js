import React, { Component } from "react";
import { Link } from "gatsby"
import wordpress from "../../api/wordpress";

class Header extends Component {
  state = {
    navItems: []
  };

  componentDidMount = async () => {
    const response = await wordpress.get("/acf/v3/menu");
    this.setState({ navItems: response.data.reverse() });
  };

  render = () => {
    return (
      <nav>
        <ul>
          {this.state.navItems.map(item => {
            return (
              <li key={item.acf.name}>
                <Link to={item.acf.link}>{item.acf.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };
}

export default Header;