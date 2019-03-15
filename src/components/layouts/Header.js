import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const Header = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allWordpressWpMenu {
            edges {
              node {
                acf {
                  name
                  link
                }
              }
            }
          }
        }
      `}
      render={data => {
        const queryData = data.allWordpressWpMenu.edges
        return (
          <nav>
            <ul>
              {queryData.map(item => {
                return (
                  <li key={item.node.acf.name}>
                    <Link to={item.node.acf.link}>{item.node.acf.name}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        )
      }}
    />
  )
}

export default Header