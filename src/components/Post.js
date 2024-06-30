import React from 'react'
import { Link } from 'gatsby'
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap'
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Post = ({ title, author, path, date, body, fluid }) => {
    return (
        <Card>
            <GatsbyImage
                className="card-image-top"
                image={fluid} // Directly use the fluid data passed as prop
            />
            <CardBody>
                <CardTitle>
                    <Link to={path} >{title}</Link>
                </CardTitle>
                <CardSubtitle>
                    <span className="text-info">{date}</span> by {' '}
                    <span className="text-info">{author}</span>
                </CardSubtitle>
                <CardText>{body}</CardText>
                <Link to={path} className="btn btn-outline-primary float-right">Read more</Link>
            </CardBody>
        </Card>
    )
}

export default Post