import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"




const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Home Page</h1>
    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post title={node.frontmatter.title}
                author={node.frontmatter.author}
                path={node.frontmatter.path}
                body={node.excerpt}
                date={node.frontmatter.date}
                fluid={node.frontmatter.image.childImageSharp.fluid}
              />
            ))}
          </div>
        )
      }}
    />
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
            image{
              childImageSharp{
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                
                }
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
