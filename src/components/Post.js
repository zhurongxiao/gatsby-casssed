import React from 'react'
import { Link } from 'gatsby'
import { Badge, Card, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap'
import { GatsbyImage } from "gatsby-plugin-image";
import { slugify } from '../util/utilityFunctions';

const Post = ({ title, author, path, date, body, fluid, tags }) => {
    return (
        <Card>
            <Link to={path}>
                <GatsbyImage
                    className="card-image-top"
                    image={fluid} // Directly use the fluid data passed as prop
                />
            </Link>

            <CardBody>
                <CardTitle>
                    <Link to={path} >{title}</Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{date}</span> by {' '}
                    <span className="text-info">{author}</span>
                </CardSubtitle>
                <CardText>{body}</CardText>
                <ul className="post-tags>">
                    {tags.map(tag => (
                        <li>
                            <Link to={`/tag/${slugify(tag)}`}>
                                <Badge color="primary" className="text-uppercase">{tag}</Badge>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link to={path} className="btn btn-outline-primary float-right">Read more</Link>
            </CardBody>
        </Card>
    )
}

export default Post