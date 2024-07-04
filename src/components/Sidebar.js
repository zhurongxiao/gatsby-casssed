import React from 'react'
import { Card, CardTitle, CardBody, Form, FormGroup, Input } from 'reactstrap'
import { graphql, Link, StaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Sidebar = () => (

    <div>
        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase mb-3">Newsletrter</CardTitle>
            </CardBody>
            <Form className='text-center'>
                <FormGroup>
                    <Input type="email" name="email" placeholder="Your Email address" />
                    <button className="btn btn-outline-success text-uppercase">Subscribe</button>
                </FormGroup>
            </Form>
        </Card>
        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase">Advertisement</CardTitle>
                <img src="https://via.placeholder.com/320x200" alt="Advert" style={{ width: '100%' }} />
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase">Recebt Pists</CardTitle>




                <StaticQuery
                    query={sidebarQuery}
                    render={data => {
                        return (
                            <div>
                                {data.allMarkdownRemark.edges.map(({ node }) => {
                                    const fluid = getImage(node.frontmatter.image) // Access node.frontmatter.image inside the loop
                                    return (
                                        <Card key={node.id}>
                                            <Link to={node.frontmatter.path}>
                                                <GatsbyImage className="card-image-top" image={fluid} />
                                            </Link>
                                            <CardBody>
                                                <CardTitle>
                                                    <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
                                                </CardTitle>
                                            </CardBody>
                                        </Card>
                                    )
                                })}
                            </div>
                        )
                    }}
                />



            </CardBody>
        </Card>
    </div>

)

const sidebarQuery = graphql`
    query SidebarQuery {
        allMarkdownRemark(sort: {frontmatter: {date: DESC}} limit: 3) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        path
                        image{
                            childImageSharp{
                                gatsbyImageData(width: 300)
                            }
                        }
                    }
                }
            }
        }
    }
 `




export default Sidebar
