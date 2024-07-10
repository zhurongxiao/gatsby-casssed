import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Post from "../components/Post"

const IndexPage = () => {
  const data = useStaticQuery(indexQuery);

  return (
    <Layout pageTitle="CodeBlog">
      <Seo title="Home" />

      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const fluid = getImage(node.frontmatter.image);
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
    </Layout>
  );
}

const indexQuery = graphql`
  query indexQuery{
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}
      limit: 2){
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
                gatsbyImageData(layout: FULL_WIDTH)
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
`;

export default IndexPage;