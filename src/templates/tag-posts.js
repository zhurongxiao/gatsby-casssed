import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import Post from '../components/Post'
import { getImage } from "gatsby-plugin-image"


const tagPosts = ({ data, pageContext }) => {
    const { tag } = pageContext
    const { totalCount } = data.allMarkdownRemark
    const pageHeader = `${totalCount} post${totalCount === 1 ? '' : 's'
        } tagged with "${tag}"`


    return (

        <Layout pageTitle={pageHeader}>
            {data.allMarkdownRemark.edges.map(({ node }) => {
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

export const tagQuery = graphql`
    query($tag: String!){
        allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: {frontmatter: {tags: {in: [$tag]}}}
        ){
            totalCount
            edges{
                node{
                    id
                    frontmatter{
                        title
                        date(formatString: "MMMM Do, YYYY")
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

{/*
    query($tag: String!) { // 定义一个变量 $tag，类型为 String
        allMarkdownRemark( // 查询所有 Markdown 格式的文章
            sort: { frontmatter: { date: DESC } } // 按日期降序排序
            filter: { frontmatter: { tags: { in: [$tag] } } } // 过滤出包含特定标签的文章
        ) {
            totalCount // 返回文章总数
    
 */}

export default tagPosts
