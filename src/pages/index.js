import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"
import { getImage } from "gatsby-plugin-image"
import { Row, Col } from "react-bootstrap"
import Sidebar from "../components/Sidebar"





const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Home Page</h1>
    <Row>
      <Col md="8">
        <StaticQuery
          query={indexQuery}
          render={data => {
            return (
              <div>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                  const fluid = getImage(node.frontmatter.image) // Access node.frontmatter.image inside the loop
                  return (
                    <Post
                      title={node.frontmatter.title}
                      author={node.frontmatter.author}
                      path={node.frontmatter.path}
                      body={node.excerpt}
                      date={node.frontmatter.date}
                      fluid={fluid}
                      tags={node.frontmatter.tags}
                    />
                  )
                })}
              </div>
            )
          }}
        />
      </Col>
      <Col md="4">
        {/* <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.4)" }}>

        </div> */}
        <Sidebar />
      </Col>
    </Row>
  </Layout>
)

const indexQuery = graphql`
  query {
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}){
      edges{
        node{
          id
          frontmatter{
            title
            date(formatString: "MMM Do YYYY")
            author
            path
            tags
            image{
              childImageSharp{
                gatsbyImageData(width: 600)
              }
            }
          }
          excerpt
        }
      }
    }
    
  }
`

export default IndexPage
