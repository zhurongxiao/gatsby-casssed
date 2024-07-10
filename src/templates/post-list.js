import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import { graphql } from 'gatsby'
import { getImage } from "gatsby-plugin-image"




const postList = (props) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage } = props.pageContext

  return (
    <Layout pageTitle={`Posts Page ${currentPage}`}>
      {posts.map(({ node }) => {
        const fluid = getImage(node.frontmatter.image);
        return (
          <Post key={node.id}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            author={node.frontmatter.author}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
            fluid={fluid}
          />
        )
      })}
    </Layout>
  )


}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            author
            tags
            image{
                  childImageSharp {
                          gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`


export default postList
