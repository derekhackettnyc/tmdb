import React, { Component } from "react"
import Slider from "react-slick"

import { IMAGE_BASE_URL, PROFILE_SIZE, BACKDROP_SIZE } from '../../config'

export default class SlickSlider extends Component {

  render() {
    const settings = {
      dots: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide:0,
      // arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings}>
        {this.props.slides.map(({id, backdrop_path, title, vote_average }) => (
          <div className="course-details" key={id}>
            <div className="course-details__picture">
              <img src={`${IMAGE_BASE_URL}${PROFILE_SIZE}${backdrop_path}`} alt={title} />
            </div>
            <div className="course-details__main">
              <h2 className="course-details__title">{title}</h2>
              <p>{vote_average} <i className="fas fa-star" style={{ color: 'orange' }}></i></p>
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}