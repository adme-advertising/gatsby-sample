import React, { Component } from "react";
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
                <a href={item.acf.link}>{item.acf.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };
}

export default Header;