import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"
import { getImage } from "gatsby-plugin-image"





const IndexPage = () => (
  <Layout pageTitle="CodeBlog">
    <Seo title="Home" />

    <StaticQuery
      query={indexQuery}
      render={data => {
        return (
          <div>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const fluid = getImage(node.frontmatter.image) // Access node.frontmatter.image inside the loop
              return (
                <Post
                  key={node.id}
                  title={node.frontmatter.title}
                  author={node.frontmatter.author}
                  slug={node.fields.slug}
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


  </Layout>
)

const indexQuery = graphql`
  query indexQuery{
      allMarkdownRemark(sort: {frontmatter: {date: DESC}}){
      edges{
        node{
          id
          frontmatter{
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image{
              childImageSharp{
                gatsbyImageData(width: 600)
              }
            }
          }
            fields{
              slug
            }
          excerpt
        }
      }
    }
    
  }
`

export default IndexPage
