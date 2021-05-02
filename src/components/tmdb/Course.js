import React from 'react'
import { Link } from 'react-router-dom'

import { IMAGE_BASE_URL, POSTER_SIZE, PROFILE_SIZE } from '../../config'

const Course = ({ course }) => {

    const formatDate = new Date(course.release_date || course.first_air_date).toDateString()
    const resourceImage= course.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${course.poster_path}`  : null

    return (
        // <Link to={`/${course.catagories[0]}/${course.catagories[1]}/${course.catagories[2]}/${course.id}`} key={course.id}>
            <li className="course" >
                <div className="course__picture">
                    {/* <img src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${course.backdrop_path}` || '/assets/images/no_image.jpg'} alt={course.title} /> */}
                    <img src={resourceImage} alt={course.title} />

                </div>
                <div className="course__main">
                    <h2 className="course__title">{course.title || course.name}</h2>
                    {/* <p className="course__headline" dangerouslySetInnerHTML={{ __html: course.headline }} />
                    <p>{course.visible_instructors[0].display_name}</p> */}
                    <p>{course.vote_average} <i className="fas fa-star" style={{ color: 'orange' }}></i> | {course.vote_count} (reviews)</p>
                    <p>{course.content_info} | {course.num_published_lectures} <i className="fas fa-video"></i> | {course.instructional_level_simple}</p>
                    <p>{course.overview}</p>
                    <p style={{marginTop:'1rem'}}>Release Date: <strong>{formatDate}</strong></p>
                </div>
                {/* <div className="course__date">
                    {formatDate}
                </div> */}
            </li>
        // </Link>

    )

}

export default Course