import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPerson } from '../../actions'

const Person = props => {

    const { id } = props.match.params;

    // const { isLoading, resource, credits, recommended } = useSelector(state => ({
    //     isLoading: state.async.loading,
    //     resource: state.resources.resource,
    //     credits: state.resources.credits,
    //     recommended: state.resources.recommended
    // }))

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchPerson(id))
    },[id])


    return(
        <div>PErson</div>
    )
}

export default Person