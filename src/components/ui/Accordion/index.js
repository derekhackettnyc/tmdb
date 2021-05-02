import React, { Component } from 'react'
// import CollapsibleBox from '../CollapsibleBox'

const accordion = [

    {
        section: {label:'sectiona', title:'Section A'},
        paragraph: "eget tincidunt nibh pulvinar a."
    },
    {
        section: {label:'sectionb', title:'Section B'},
        paragraph: "ed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta."
    },
    {
        section: {label:'sectionc', title:'Section C'},
        paragraph: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Cras ultricies ligula sed magna dictum porta."
    }

]

class Accordion extends Component {

    constructor(props) {
        super(props);
        this.collapibleBoxes = []
    }    

    state = {
        active: '',
        height: 0
    }

    componentDidMount() {
        this.setState({refs:this.collapibleBoxes})
    }


    handleRef = ref => {
        this.collapibleBoxes.push(ref)
    }

    handleClickEvent = (event, button) => {

        // console.log("EVENT",event.target.nextElementSibling.scrollHeight)
        this.setState({
            active: this.state.active === button ? "" : button,
            height: `${event.target.nextElementSibling.scrollHeight}px`
        })
    }


    accordionBellow = (data) => {

        return (
            <li className="collapsible-box" key={data.title}>
                <button
                    onClick={(event) => this.handleClickEvent(event, data.section.label)}
                    className={`collapsible-box__button ${this.state.active === data.section.label ? 'active' : ''}`}
                >
                    {data.section.title}
                 </button>
                <div className="collapsible-box__content" style={this.state.active === data.section.label ? { height: this.state.height } : { height: "0px" }}>
                    <p>{data.paragraph}</p>
                </div>
            </li>
        )
    
    }      

    render() {

        return (
            <ul className="accordion">

                {/* {
                    accordion.map( panel => <CollapsibleBox handleRef={this.handleRef} boxRefs={this.state.refs} panel={panel}/>)
                } */}

                {
                    accordion.map(panel => this.accordionBellow(panel))
                }

            </ul>
        )
    }
}
export default Accordion





