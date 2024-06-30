import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"
import { getImage } from "gatsby-plugin-image"




const IndexPage = () => (

  <Layout>
    <Seo title="Home" />
    <h1>Home Page</h1>
    <StaticQuery
      query={indexQuery}
      render={data => {
        const fluid = getImage(node.frontmatter.image) // Define fluid inside the map function
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
              <Post title={node.frontmatter.title}
                author={node.frontmatter.author}
                path={node.frontmatter.path}
                body={node.excerpt}
                date={node.frontmatter.date}
                fluid={fluid}
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
                gatsbyImageData(width: 200)
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
