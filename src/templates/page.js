import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

const Page = props => {
  console.log(props)
  const title = props.pageContext.title
  const content = props.pageContext.content
  console.log(content)
  return (
    <div>
      <Header />
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <Footer />
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    allWordpressPage(filter: { title: { eq: $id } }) {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`

export default Page
