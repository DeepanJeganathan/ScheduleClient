import { EDIT,FETCH_SCHEDULES_SUCCESS, FETCH_SCHEDULES_FAIL, FETCH_SCHEDULES_REQUEST, POST_FAIL, POST_SUCCESS, REMOVE_SCHEDULE } from "./scheduleTypes"
import axios from 'axios'

// const url= "https://localhost:44330/api/FamilyImageViewer/"
const url = "http://32.82.64.109:8081/api/schedule/"


export const fetch_schedules_request = () => {
    return {
        type: FETCH_SCHEDULES_REQUEST
    }
}

export const fetch_schedules_success = (data) => {
    return {
        type: FETCH_SCHEDULES_SUCCESS,
        payload: data
    }
}

export const fetch_schedules_fail = (errorMsg) => {
    return {
        type: FETCH_SCHEDULES_FAIL,
        payload: errorMsg
    }
}

export const edit=(data)=>{

    return {
        type:EDIT,
        payload:data

    }
}


export const fetch_schedules = () => {
    
    return (dispatch) => {

        
        dispatch(fetch_schedules_request());
        axios.get(url).then(res => dispatch(fetch_schedules_success(res.data)))
            .catch(err => dispatch(fetch_schedules_fail(err.msg)));

    }
}


export const post_success = () => {
    return {
        type: POST_SUCCESS
    }
}

export const post_fail = (errMsg) => {
    return {
        type: POST_FAIL,
        payload: errMsg
    }
}

export const remove_schedule = (data) => {
 
    return {
        type: REMOVE_SCHEDULE,
        payload: data
    }
}


export const post = (data) => {

    return (dispatch) => {
        axios.post(url, data).then(res => dispatch(post_success()))
            .catch(err => dispatch(post_fail(err.message)))          
    }
}

export const removeSchedule = (id) => {
    return (dispatch) => {
        axios.delete(url + id).then(res => dispatch(remove_schedule(id), dispatch(fetch_schedules()))).then(err => console.log(err.msg))
    }
}

export const edit_schedule=(id,form)=>{

    return (dispatch)=>{
        axios.put(url+id,form).then(res=> dispatch(edit(res.data))).catch(err=>fetch_schedules_fail(err.msg))
    }

}