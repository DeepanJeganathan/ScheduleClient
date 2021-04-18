import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
const defaultImg =
  "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg";


const initalValues = {
  scheduleId: 0,
  firstName: "",
  lastName: "",
  date: "",
  workstationType: "Insulation",
  comment: "",
  imageName: "",
  imageSrc: defaultImg,
  imageFile: null,
};


function Schedule({ updateData, addOrEdit }) {

  //use error object to set validation error for specified fields, values are boolean  
  const [errors, setErrors] = useState({});
  //set form values to the inital values, when  filling out new for or after submitting a form
  const [formValues, setFormValues] = useState(initalValues);

  //form dropdown
  const [dropDownValue, setValue]=useState('Insulation');

  function HandleDropdown(e){

setValue(e.target.value);

  }

  // when the there is update values passed from parent, set the values of form to update values
  useEffect(() => {
    if (updateData != null) {
      setFormValues(updateData);
      console.log(formValues)
    }

  }, [updateData])



  function ResetForms() {
    console.log("reset hit")
    setFormValues(initalValues);
    setErrors({});
    //reset image uploader seperately
    document.getElementById('image-uploader').value = null;
  }

  //get name value from e.target
  function HandleChange(e) {

    //ex e.target['firstName']= 'john'
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }


  function ShowPreview(e) {
    console.log("showpreviewfunc")
    console.log(e.target.files[0])

    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      //get virtual path to show image preview use filereader built in function
      const reader = new FileReader();
      reader.onload = (img) => {
        setFormValues({
          ...formValues,
          imageFile: imgFile,     
          imageSrc: img.target.result,
          
        });

      };
      reader.readAsDataURL(imgFile);
    } else {
      setFormValues({
        ...formValues,
        imageFile: null,
        imageSrc: defaultImg,
      });
    }
  }

  function ValidateFields() {
    let fieldValues = {};
    fieldValues.firstName = formValues.firstName === "" ? false : true;
    fieldValues.lastName = formValues.lastName === "" ? false : true;
    fieldValues.date = formValues.date === "" ? false : true;
    fieldValues.workstationType = formValues.workstationType === "" ? false : true;
    fieldValues.comment = formValues.comment === "" ? false : true;
    fieldValues.imageSrc = formValues.imageSrc === defaultImg ? false : true;
    setErrors(fieldValues);
    console.log(errors);
    return Object.values(fieldValues).every((x) => x === true);
  }

  function HandleSubmit(e) {
    console.log(formValues);
    formValues.workstationType=dropDownValue;
    e.preventDefault();
    if (ValidateFields()) {
      const formData = new FormData();
      formData.append('scheduleId', formValues.scheduleId)
      formData.append('firstName', formValues.firstName)
      formData.append('lastName', formValues.lastName)
      formData.append('date', formValues.date)
      formData.append('workstationType', formValues.workstationType)
      formData.append('comment', formValues.comment)
      formData.append('imageName', formValues.imageName)
      formData.append('imageSrc', formValues.imageSrc)
      formData.append('imageFile', formValues.imageFile)

      addOrEdit(formData, ResetForms);

      console.log(
        `form values are now set to ${console.log(
          formValues
        )}, errors are now reset to ${console.log(errors)}`
      );
    } else {
      console.log("validation failed");
    }
  }

  function applyErrorClass(field) {
    if (field in errors && errors[field] === false) {
      return "invalid-field";
    }
  }

  return (
    <>
      <Card className="form">
        {" "}
        <Form autoComplete="off" noValidate onSubmit={HandleSubmit}>
          <Card.Img style={{ width: '80%', margin: '5px' }} variant="top" src={formValues.imageSrc} />

          <Card.Body>
            <Form.Group>
              <Form.File

                id="image-uploader"
                accept="image/*"
                className={applyErrorClass("imageSrc")}
                onChange={ShowPreview}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                className={applyErrorClass("firstName")}
                placeholder="enter first name"
                name="firstName"
                value={formValues.firstName}
                onChange={HandleChange}
              />

            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                className={applyErrorClass("lastName")}
                name="lastName"
                value={formValues.lastName}
                onChange={HandleChange}
                placeholder="enter last name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Date</Form.Label>
              <Form.Control
                type="date"
                className={applyErrorClass("date")}
                name="date"
                value={formValues.date}
                onChange={HandleChange}
              />
            </Form.Group>
      
            <Form.Group>            
            <Form.Label> Workstation Type</Form.Label>
              <Form.Control
              name="workstationType"
              className={applyErrorClass("workstationType")}
              onChange={HandleDropdown}
              as="select"
            >             
              <option value="Insulation" >Insulation</option>
              <option value="Twinners">Twinners</option>
              <option value="Cabling">Cabling</option>
              <option value="Jacket">Jacket</option>
              <option value="Armour">Armour</option>
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                name="comment"
                className={applyErrorClass("comment")}
                value={formValues.comment}
                onChange={HandleChange}
                placeholder="your comment here"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button className="ml-2 px-3" variant="secondary" type="button">
              Clear
            </Button>
          </Card.Body>
        </Form>
      </Card>
    </>
  );
}

export default Schedule;
