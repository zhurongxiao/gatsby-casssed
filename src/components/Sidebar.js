import React from 'react';
import { Card, CardTitle, CardText, CardBody, Form, FormGroup, Input } from 'reactstrap';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useStaticQuery } from 'gatsby';

const Sidebar = ({ author, authorFluid }) => {

    const data = useStaticQuery(sidebarQuery);

    return (
        <div>
            {author && (
                <Card>
                    <GatsbyImage className="card-image-top" image={authorFluid} alt="描述图片内容的文本" />
                    <CardBody>
                        <CardTitle className="text-center text-uppercase mb-3">
                            {author.name}
                        </CardTitle>
                        <CardText>{author.bio}</CardText>
                        <div className='author-social-links text-center'>
                            <ul>
                                <li>
                                    <a
                                        href={author.facebook}
                                        targe="_blank"
                                        rel="noopener noreferrer"
                                        className="facebook"
                                    >
                                        <i className="fab fa-facebook-f fa-lg" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={author.twitter}
                                        targe="_blank"
                                        rel="noopener noreferrer"
                                        className="twitter"
                                    >
                                        <i className="fab fa-twitter fa-lg" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={author.instagram}
                                        targe="_blank"
                                        rel="noopener noreferrer"
                                        className="instagram"
                                    >
                                        <i className="fab fa-instagram fa-lg" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={author.google}
                                        targe="_blank"
                                        rel="noopener noreferrer"
                                        className="google"
                                    >
                                        <i className="fab fa-google fa-lg" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={author.linkedin}
                                        targe="_blank"
                                        rel="noopener noreferrer"
                                        className="linkedin"
                                    >
                                        <i className="fab fa-linkedin fa-lg" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </CardBody>
                </Card>
            )}
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
                    <CardTitle className="text-center text-uppercase">Recent Posts</CardTitle>

                    <div>
                        {data.allMarkdownRemark.edges.map(({ node }) => {
                            const fluid = getImage(node.frontmatter.image);
                            return (
                                <Card key={node.id}>
                                    <Link to={node.fields.slug}>
                                        <GatsbyImage className="card-image-top" image={fluid} alt="描述图片内容的文本" />
                                    </Link>
                                    <CardBody>
                                        <CardTitle>
                                            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                                        </CardTitle>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

const sidebarQuery = graphql`
  query SidebarQuery {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 3) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                gatsbyImageData(width: 300)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Sidebar;