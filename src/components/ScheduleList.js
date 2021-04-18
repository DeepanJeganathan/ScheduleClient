import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Jumbotron, Modal, Row } from "react-bootstrap";
import Schedule from "./Schedule";
import { useSelector, useDispatch } from 'react-redux'
import Error from './Error'
import Loading from './Loading'
import { edit_schedule, fetch_schedules, post, removeSchedule, remove_schedule } from '../redux/schedule/scheduleActions'

import axios from "axios";

function ScheduleList() {

  const [updateData, setUpdateData] = useState(null)

  const schedules = useSelector(state => state)

  const dispatch = useDispatch()

  const [showModal, setShowModal]= useState(false);
  const[modalImg, setModalImg]=useState('');

  useEffect(() => {

    refresh();
  }, [schedules.post_success])

 


  const addOrEdit = (form, onSuccess) => {
    if (form.get('scheduleId') === "0") 
    {
      dispatch(post(form))
          // should work on this needs to be in the if statement , add promise
          onSuccess()   
      if (schedules.post_success) {
        onSuccess()        
      }
      else {
        console.log(schedules.error)
      }
    }
    else {
      dispatch(edit_schedule(form.get('scheduleId'),form))
    }
  }


  function refresh() {
console.log('refresh hit');
    dispatch(fetch_schedules());
  }

  function HandleEdit(x) {
    axios.get("http://32.82.64.109:8081/api/schedule/" + x.target.id)
      .then(res => setUpdateData(res.data))
      .catch(err => console.log(err.response))
  }
  function HandleDelete(e) {

    dispatch(removeSchedule(e.target.id))
  }



  const listOfSchedules = () => {

    return schedules.data.map((x, i) => {
      console.log(x)
      return (
        <Col xs={12} md={6} key={i}>
         
          <Card className='m-2' border="light"  >
          <h5> {x.date.slice(0,10)}</h5>
            <div className="card-content">
              <Card.Img variant="top" src={x.imageSrc} />
              <Card.Body>
                            
                <Card.Title> <u> {x.workStationType} </u> </Card.Title>
                <Card.Text className="text-left">
                   {x.comment}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Entered By: {x.firstName} {x.lastName}</small>
              </Card.Footer>
            </div>
            <div className="deleteOrEdit" > <i id={x.scheduleId} onClick={HandleEdit} className=" text-secondary fas fa-edit"></i><i onClick={HandleDelete} id={x.scheduleId} className=" text-secondary ml-2 far fa-trash-alt"></i></div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              
        Custom Width Modal
      </Button>
          </Card>
          <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card.Img variant="top" src={modalImg} />
        </Modal.Body>
      </Modal>
        </Col>
      )
    }
    )
  }

  if (schedules.loading) return <Loading />;

  if (schedules.error !== '') return <Error msg={schedules.error} />;

  return (
    <>

      <Col xs={12}>
        <Jumbotron className="mt-3 bg-light gradient-border " fluid>
          <Container>
            <div className="display-4 text-secondary">Schedule Viewer</div>
          </Container>
        </Jumbotron>
      </Col>
      <Col xs={12} md={4}>
        <Schedule updateData={updateData} addOrEdit={addOrEdit} />
      </Col>
      <Col className=" family-list-container" xs={12} md={8}>
        <h5 className="mt-3">Details</h5>
        <hr></hr>

        <Row>
          {listOfSchedules()}


        </Row>

      </Col>
    </>
  );

}
export default ScheduleList
