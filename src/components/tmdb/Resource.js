import React from 'react'
import { Link } from 'react-router-dom'

import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config'

const Resource = ({ resourceType, resource }) => {

    const formatDate = new Date(resource.release_date || resource.first_air_date).toDateString()
    const resourceImage= resource.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${resource.poster_path}`  : null

    return (
        <Link to={`/${resourceType}/${resource.id}`}>
            <li className="course" >
                <div className="course__picture">
                    <img src={resourceImage} alt={resource.title} />
                </div>
                <div className="course__main">
                    <h2 className="course__title">{resource.title || resource.name}</h2>
                    <p>{resource.vote_average} <i className="fas fa-star" style={{ color: 'orange' }}></i> | {resource.vote_count} (reviews)</p>
                    <p>{resource.content_info} | {resource.num_published_lectures} <i className="fas fa-video"></i> | {resource.instructional_level_simple}</p>
                    <p>{resource.overview}</p>
                    <p style={{marginTop:'1rem'}}>Release Date: <strong>{formatDate}</strong></p>
                </div>
            </li>
        </Link>
    )
}

export default Resource