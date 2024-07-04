// 文章页面组件模板


import React from 'react'
import Layout from '../components/layout'
import Sidebar from '../components/Sidebar'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Row, Card, CardBody, CardSubtitle, Badge, Col } from 'react-bootstrap'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { slugify } from '../util/utilityFunctions'

const SinglePost = ({ data }) => {
    const post = data.markdownRemark.frontmatter
    const fluid = getImage(post.image) // Access node.frontmatter.image inside the loop

    return (
        <Layout>
            <SEO title={post.title} />
            <h1>{post.title}</h1>
            <Row>
                <Col md="8">
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

                </Col>
                <Col md="4">
                    <Sidebar />
                </Col>
            </Row>
        </Layout>
    )
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!) {
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
    }`

export default SinglePost
