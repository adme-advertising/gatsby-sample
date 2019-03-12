import React, { Component } from "react"
import { graphql } from "gatsby"
import Header from '../components/layouts/Header'

class Home extends Component {
  render() {
      return (
      <div><Header />Welcome</div>
      )
  }
}

export default Home

// Set here the ID of the home page.
export const pageQuery = graphql`
  query {
    allWordpressPage {
      edges {
        node {
          id
          title
          excerpt
          slug
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`
