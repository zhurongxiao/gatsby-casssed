// 文章页面组件模板


import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { Card, CardBody, CardSubtitle, Badge } from 'react-bootstrap'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { slugify } from '../util/utilityFunctions'
import authors from '../util/authors'
import { DiscussionEmbed } from 'disqus-react'

const SinglePost = ({ data, pageContext }) => {
    const post = data.markdownRemark.frontmatter
    const post1 = data.file
    const fluid = getImage(post.image) // Access node.frontmatter.image inside the loop
    const authorImageFluid = getImage(post1)

    // const authorImageFluid = getImage(post1)
    const author = authors.find(x => x.name === post.author)

    const baseUrl = 'https://gatsbytutorial.co.uk/'
    const disqusShortname = 'https-gatsbytutorial-co-uk'
    const disqusConfig = {
        identifier: data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug,
    }

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
            <h3 className='text-center soclial-share-links'>Share this post</h3>
            <div className="text-center social-share-links">
                <ul>
                    <li>
                        <a
                            href={
                                'https://www.facebook.com/sharer/sharer.php?u=' +
                                baseUrl +
                                pageContext.slug
                            }
                            className="facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook-f fa-2x" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={
                                'https://twitter.com/share?url=' +
                                baseUrl +
                                pageContext.slug +
                                '&text=' +
                                post.title +
                                '&via' +
                                'twitterHandle'
                            }
                            className="twitter"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-twitter fa-2x" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={
                                'https://plus.google.com/share?url=' +
                                baseUrl +
                                pageContext.slug
                            }
                            className="google"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-google fa-2x" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={
                                'https://www.linkedin.com/shareArticle?url=' +
                                baseUrl +
                                pageContext.slug
                            }
                            className="linkedin"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin fa-2x" />
                        </a>
                    </li>
                </ul>
            </div>
            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

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
