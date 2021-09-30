import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
//or i can usr props and access with props.product
const Blog = ({blog}) => {
    return (
        <Card className='p-3 my-3 rounded'>
            <Link to={`/blog/${blog._id}`}>
                <Card.Img src={blog.image} variant='top'/>
            </Link>
            <Card.Body>
            <Link to={`/blog/${blog._id}`}>
                <Card.Title as='div'>
                   <strong> {blog.name}</strong> 
                </Card.Title>
            </Link>

            <Card.Text as='div'>
               <Rating 
               value={blog.rating} 
               text={`${blog.numReviews} reviews`}
                />
            </Card.Text>
            
            </Card.Body>
        </Card>
    )
}

export default Blog
