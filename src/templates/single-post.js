// 文章页面组件模板


import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { Card, CardBody, CardSubtitle, Badge } from 'react-bootstrap'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { slugify } from '../util/utilityFunctions'
import authors from '../util/authors'

const SinglePost = ({ data }) => {
    const post = data.markdownRemark.frontmatter
    const post1 = data.file
    const fluid = getImage(post.image) // Access node.frontmatter.image inside the loop
    const authorImageFluid = getImage(post1)

    // const authorImageFluid = getImage(post1)
    const author = authors.find(x => x.name === post.author)
    return (
        <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={authorImageFluid}>
            {/* <SEO title={post.title} /> */}

            <Card>
                <GatsbyImage className="card-image-top" image={fluid} alt="描述图片内容的文本" />
                <CardBody>

                    <CardSubtitle>
                        <span className="text-info">
                            {post.date}
                        </span> by {' '}
                        <span className="text-info">{post.author}</span>
                    </CardSubtitle>

                    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />

                    <ul className="post-tags">
                        {post.tags.map(tag => (
                            <li key={tag}>
                                <Link to={`/tags/${slugify(tag)}`}>
                                    <Badge color="primary">{tag}</Badge>

                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardBody>

            </Card>


        </Layout>
    )
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!, $imageUrl: String!) {
        markdownRemark(fields: { slug: {eq: $slug}}){
            id
            html
            frontmatter {
                title
                author
                date(formatString: "MMM Do, YYYY")
                tags
                image{
                    childImageSharp{
                        gatsbyImageData(width: 800)
                    }
                }
            }
        }
            file(relativePath: {eq: $imageUrl}){
                childImageSharp{
                    gatsbyImageData(width: 300)
                }
            }
    }`

export default SinglePost
