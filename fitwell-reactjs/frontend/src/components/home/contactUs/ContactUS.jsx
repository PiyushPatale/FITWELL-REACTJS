import React, {useState} from "react";
import "./ContactUS.css";
// import ContactUsValidateForm from "./ContactUsFormValidate";
import UserActionService from "../../../services/UserActionService";
import LoaderComp from "../../Loader";

const ContactUS = (props) => {
  const {setmyAlert} = props;
  const [isLoading, setIsLoading]=useState(false);
  const initialData={
    name:'',
    phone:'',
    email:'',
    subject:'',
    message:''
  }
  const [data, setData]=useState(initialData)

  const formHandler=(e)=>{
    const {name, value}=e.target;
    data[name]=value;
    setData({...data});
  }

  const handleClickSubmit=async()=>{
    setIsLoading(true);
    const res=await UserActionService.contactUs(data);
    if(!res.error){
      setData(initialData)
    }
    setIsLoading(false);
    setmyAlert(res.msg, res.error ? 'error' : 'success')
  }
  return (
    <>
    {
      isLoading ? (
        <LoaderComp></LoaderComp>
      )
      :
      (
        <div style={{padding : "0vw", margin:"0vw"}}>
        <div class="containerContactUs">
          <h1>CONNECT WITH US</h1>
          <br />
          <p style={{ color: "white" , textAlign:"center"}}>
            We would love to respond to your queries and help you succeed
            <br />
            Feel free to get in touch with us
          </p>
          <div class="contact-box">
            <div class="contact-left">
              <h3>Tell us about you</h3>
  
              <form
                className="contactUsForm"
                name="contact"
                onSubmit={handleClickSubmit}
              >
                <div class="input-row">
                  <div class="input-group">
                    <label>Name</label>
                    <input
                      type="text" class="contactUsInputText"
                      placeholder="Enter Your Name"
                      name="name"
                      onChange={formHandler}
                    />
                  </div>
                  <div class="input-group">
                    <label>Phone</label>
                    <input
                      type="text" class="contactUsInputText"
                      placeholder="Enter Contact No."
                      name="phone"
                      onChange={formHandler}
                    />
                  </div>
                </div>
                <div class="input-row">
                  <div class="input-group">
                    <label>Email</label>
                    <input
                      type="text" class="contactUsInputText"
                      placeholder="Enter email address"
                      name="email"
                      onChange={formHandler}
                    />
                  </div>
                  <div class="input-group">
                    <label>Subject</label>
                    <input
                      type="text" class="contactUsInputText"
                      placeholder="Enter Subject"
                      name="subject"
                      onChange={formHandler}
                    />
                  </div>
                </div>
                <label style={{marginLeft : "1.3vw" , color:'orangered'}}>Message</label>
                <textarea
                  rows="5"
                  class="contactUsTextarea"
                  placeholder="What's on your mind"
                  name="message"
                  onChange={formHandler}
                ></textarea>
                <button class="contactUsSubmit" type="submit" onClick={handleClickSubmit}>Submit</button>
              </form>
            </div>
  
            <div class="contact-right">
              <h3>Reach Us</h3>
              <table>
                <tr className="contactUsTR">
                  <td className="contactUsTD">Email</td>
                  <td className="contactUsTD">fitwell@gmail.com</td>
                </tr>
                <tr className="contactUsTR">
                  <td className="contactUsTD">Phone</td>
                  <td className="contactUsTD">+91 7066******</td>
                </tr>
  
                <tr className="contactUsTR">
                  <td className="contactUsTD">Address</td>
                  <td className="contactUsTD">
                    102 , Mirza , Guwahati
                    <br />
                    Some layout , Some Road , Guwahati
                    <br />
                    Assam 781015
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="map-container">
          <div class="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7690959.395339504!2d80.49871646322487!3d19.740225078293737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5987e09da847%3A0xfc90e6da1b4547c1!2sIndian%20Institute%20of%20Information%20Technology%20Guwahati%20(IIITG)!5e0!3m2!1sen!2sin!4v1720635805634!5m2!1sen!2sin"
              height="500"
              style={{ border: "0" }}
              title="Gym Location"
            />
          </div>
        </div>
      </div>
      )
    }
    </>
  );
};

export default ContactUS;
