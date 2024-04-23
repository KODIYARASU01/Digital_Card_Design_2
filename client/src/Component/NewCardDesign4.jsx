import React, { useRef, useEffect, useState } from "react";
import "./NewCardDesign4.scss";
import banner_img from "../assets/background2.jpg";
import avatar from "../assets/profile.png";
import website from "../assets/website.png";
// import tag from "../../../assets/Social Medias/tag.gif";
// import shape from "../../../assets/New_Design/g2.png";
// import graph from "../../../assets/New_Design/graph3.png";
// import graph2 from "../../../assets/New_Design/g3.png";
// import title_graph from "../../../assets/New_Design/title3.png";
// import social_graph from "../../../assets/New_Design/socialmedia_graph2.png";
// import sgraph from "../../../assets/New_Design/service_3/s_graph.png";
// import sgraph1 from "../../../assets/New_Design/service_3/s_graph1.png";
import { Link, useParams } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import axios from "axios";
import emailjs from "@emailjs/browser";
// Service
import product1 from "../assets/1.jpg";
import product2 from "../assets/2.jpg";
import product3 from "../assets/3.jpg";
import product4 from "../assets/4.jpg";
import product5 from "../assets/5.jpg";
//Product
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

// import Carousel1 from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
//Carousel Testimonial
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
//QRCODE:

import qrcode from "../assets/qr.svg";
//Testimonial
import { useContext } from "react";

// ProductSlider
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import withAutoplay from "react-awesome-slider/dist/autoplay";

const NewCardDesign4 = () => {
  let [serviceLoad, setServiceLoad] = useState(false);
  console.log(serviceLoad);
  const buttonStyle = {
    width: "0px",
    background: "none",
    opacity: 0,
    border: "0px",
    padding: "0px",
  };
  const properties = {
    prevArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
        </svg>
      </button>
    ),
    nextArrow: (
      <button style={{ ...buttonStyle }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
        >
          <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
        </svg>
      </button>
    ),
  };
  let id = useParams();
  let [formData, setFormData] = useState({
    clientFullName1: "",
    clientEmail1: "",
    clientMobileNumber1: "",
    clientInquiries1: "",
  });
  //Popup show :
  let [popup, setPopup] = useState(false);
  //Form Submit loader :
  let [loading, setLoading] = useState(false);
  //Collect form data by using useRef:
  let form = useRef();
  let popUp_open = {
    hide: { opacity: 0, scale: 0.2 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" },
    },
  };
  //recieve email and send email to user by  emailJS:
  const sendEmail = (e) => {
    // e.preventDefault();

    emailjs
      .sendForm(
        "service_8jjtsu7",
        "template_5ro61jb",
        form.current,
        "6JJQhAKoQ9fGApzig"
      )
      .then(
        (result) => {
          // console.log(result.text);
          // console.log('message sent success')
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };
  //Form Logic :
  let formik = useFormik({
    initialValues: {
      clientFullName1: "",
      clientEmail1: "",
      clientMobileNumber1: "",
      clientInquiries1: "",
    },

    //Validation :
    validationSchema: Yup.object({
      clientFullName1: Yup.string()
        .min(3, "Min 3 char required")
        .max(20, "Name must be 20 character or less")
        .required("Name is required"),
      clientEmail1: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      clientMobileNumber1: Yup.string()
        .min(10, "Invalid Mobile number")
        .max(10, "Invalid Mobile number")
        .required("MobileNumber is required"),
      clientInquiries1: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(100, "Inquiries must be 100 character or less")
        .required("Inquiries is required"),
    }),
    //Form Submit :
    onSubmit: (values) => {
      setFormData({
        clientFullName1: values.clientFullName1,
        clientEmail1: values.clientEmail1,
        clientMobileNumber1: values.clientMobileNumber1,
        clientInquiries1: values.clientInquiries1,
      });

      sendEmail();
      setLoading(!loading);
      setConfetti(true);
      setTimeout(() => {
        setPopup(!popup);
        setLoading(false);
        setConfetti(!confetti);
        formik.values.clientFullName1 = "";
        formik.values.clientEmail1 = "";
        formik.values.clientMobileNumber1 = "";
        formik.values.clientInquiries1 = "";
      }, 4000);

      setTimeout(() => {
        setPopup(false);
      }, 7000);
      StopConfetti();
    },
  });
  let [feedbackForm, setFeedbackForm] = useState({
    userName: "",
    userFeedback: "",
    currentRatting: 0,
  });
  let [feedbackLoader, setFeedbackLoader] = useState(false);
  let [commentOpen, setCommentOpen] = useState(false);
  let [AllFeedBacks, setAllFeedBacks] = useState([]);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  //Form Logic :
  let feedbackFormik = useFormik({
    initialValues: {
      userName: "",
      userFeedback: "",
      currentRatting: 0,
    },

    //Validation :
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Min 3 char required")
        .max(50, "Name must be 20 character or less")
        .required("Name is required"),
      userFeedback: Yup.string()
        .min(10, "Minimum 10 character required")
        .max(400, "Feedback must be 100 character or less")
        .required("Feedback is required"),
    }),
    //Form Submit :
    onSubmit: async (values) => {
      setFeedbackForm({
        userName: values.userName,
        userFeedback: values.userFeedback,
        currentRatting: values.currentRatting,
      });
      feedBackSubmit();
      setTimeout(() => {
        feedbackFormik.values.userName = "";
        feedbackFormik.values.userFeedback = "";
        feedbackFormik.values.currentRatting = 0;
      }, 4000);
    },
  });
  //Start Ratting:
  // let currentRatting=0;
  function handleRatting(e) {
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      let ratting = parseInt(star.dataset.rating, 10);
      highlightStar(ratting);
    }
  }
  //Remove Ratting:
  function removeRatting() {
    highlightStar(feedbackForm.currentRatting);
  }
  //Staring Setted
  function RattingSetted(e) {
    let starRating = document.querySelector(".ratting_container");
    let star = e.target;
    // console.log(star,star.classList);
    if (star.classList.contains("star")) {
      feedbackForm.currentRatting = parseInt(star.dataset.rating, 10);
      starRating.setAttribute("data-rating", feedbackForm.currentRatting);
      highlightStar(feedbackForm.currentRatting);
    }
  }

  //Highlight star color:
  function highlightStar(ratting) {
    let stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      if (index < ratting) {
        star.classList.add("highlight");
      } else {
        star.classList.remove("highlight");
      }
    });
  }
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <>
      <div className="newCard_design4_container">
        <div className="card_design_box1">
          {/* Banner */}
          <div className="card4_box_1">
            <img src={banner_img} alt="banner" />
            <div className="overlay"></div>
            <div className="logo">
              <img src={avatar} alt="logo`" />
            </div>
          </div>
          {/* .BasicDetals */}
          <div className="card4_box_2">
            <div className="basic_detail">
              <h4>Kodiyarasu C</h4>
              <small>Full Stack Developer with MERN</small>
            </div>
            <div className="summary">
              <div className="title">
                <p>About Me</p>
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/about.png"
                  alt="about"
                />
              </div>
              <div className="content">
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis aliquid quisquam, excepturi ducimus voluptas
                  asperiores molestiae reiciendis fugiat autem cumque.
                </small>
              </div>
            </div>
          </div>
          {/* socialMedia`` */}
          <div className="card4_box_3">
            <a href="#">
              <img src={website} alt="website" />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/marker.png"
                alt="marker"
              />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/whatsapp.png"
                alt="whatsapp"
              />
            </a>
            <a href="#">
              <img
                width="188"
                height="188"
                src="https://img.icons8.com/3d-fluency/188/instagram-new.png"
                alt="instagram-new"
              />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/linkedin.png"
                alt="linkedin"
              />
            </a>
            <a href="#">
              <img
                width="188"
                height="188"
                src="https://img.icons8.com/3d-fluency/188/facebook-circled.png"
                alt="facebook-circled"
              />
            </a>
            <a href="#">
              <img
                width="94"
                height="94"
                src="https://img.icons8.com/3d-fluency/94/twitter-circled.png"
                alt="twitter-circled"
              />
            </a>
            <a href="#">
              <img
                width="188"
                height="188"
                src="https://img.icons8.com/3d-fluency/188/github.png"
                alt="github"
              />
            </a>
          </div>

          {/* Contact */}
          <div className="card4_box_4">
            <div className="contact_title">
              <p>Contact Detail</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/doodle/48/mail-contact.png"
                alt="mail-contact"
              />
            </div>
            <div className="contact_container">
              
              <div className="contact_box">
                <div className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#ffffff"
                      fill-opacity="1"
                      d="M0,32L21.8,58.7C43.6,85,87,139,131,144C174.5,149,218,107,262,128C305.5,149,349,235,393,240C436.4,245,480,171,524,154.7C567.3,139,611,181,655,202.7C698.2,224,742,224,785,202.7C829.1,181,873,139,916,106.7C960,75,1004,53,1047,69.3C1090.9,85,1135,139,1178,165.3C1221.8,192,1265,192,1309,181.3C1352.7,171,1396,149,1418,138.7L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></path>
                  </svg>
             
                </div>
                <div className="icon">
                  <img
                    width="188"
                    height="188"
                    src="https://img.icons8.com/3d-fluency/188/gmail.png"
                    alt="gmail"
                  />
                </div>
                <div className="detail">
                  <p>Kodiyarasi01@gmail.com</p>
                  <small>Email</small>
                </div>
              </div>
              <div className="contact_box">
                <div className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#ffffff"
                      fill-opacity="1"
                      d="M0,32L21.8,58.7C43.6,85,87,139,131,144C174.5,149,218,107,262,128C305.5,149,349,235,393,240C436.4,245,480,171,524,154.7C567.3,139,611,181,655,202.7C698.2,224,742,224,785,202.7C829.1,181,873,139,916,106.7C960,75,1004,53,1047,69.3C1090.9,85,1135,139,1178,165.3C1221.8,192,1265,192,1309,181.3C1352.7,171,1396,149,1418,138.7L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></path>
                  </svg>
                </div>
                <div className="icon">
                  <img
                    width="94"
                    height="94"
                    src="https://img.icons8.com/3d-fluency/94/phone-disconnected.png"
                    alt="phone-disconnected"
                  />
                </div>
                <div className="detail">
                  <p>+91 8825457794</p>
                  <small>Mobile Number</small>
                </div>
              </div>
              <div className="contact_box">
                <div className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#ffffff"
                      fill-opacity="1"
                      d="M0,32L21.8,58.7C43.6,85,87,139,131,144C174.5,149,218,107,262,128C305.5,149,349,235,393,240C436.4,245,480,171,524,154.7C567.3,139,611,181,655,202.7C698.2,224,742,224,785,202.7C829.1,181,873,139,916,106.7C960,75,1004,53,1047,69.3C1090.9,85,1135,139,1178,165.3C1221.8,192,1265,192,1309,181.3C1352.7,171,1396,149,1418,138.7L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></path>
                  </svg>
                </div>
                <div className="icon">
                  <img
                    width="94"
                    height="94"
                    src="https://img.icons8.com/3d-fluency/94/birthday--v1.png"
                    alt="birthday--v1"
                  />
                </div>
                <div className="detail">
                  <p>26-01-2000</p>
                  <small>Date Of Birth</small>
                </div>
              </div>
              <div className="contact_box">
                <div className="svg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#ffffff"
                      fill-opacity="1"
                      d="M0,32L21.8,58.7C43.6,85,87,139,131,144C174.5,149,218,107,262,128C305.5,149,349,235,393,240C436.4,245,480,171,524,154.7C567.3,139,611,181,655,202.7C698.2,224,742,224,785,202.7C829.1,181,873,139,916,106.7C960,75,1004,53,1047,69.3C1090.9,85,1135,139,1178,165.3C1221.8,192,1265,192,1309,181.3C1352.7,171,1396,149,1418,138.7L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
                    ></path>
                  </svg>
                </div>
                <div className="icon">
                  <img
                    width="94"
                    height="94"
                    src="https://img.icons8.com/3d-fluency/94/location.png"
                    alt="location"
                  />
                </div>
                <div className="detail">
                  <p>Chennai , T-Nagar,TamilNadu</p>
                  <small>Date Of Birth</small>
                </div>
              </div>
            </div>
          </div>
          {/* Services */}
          <div className="card4_box_5">
            <div className="service_title">
              <p>Our Service </p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/doodle/48/service.png"
                alt="service"
              />
            </div>

            <div className="service_container">
              <div className="service_box">
                <div className="service_image">
                  <img src={product1} alt="product" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>FrontEnd Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
                <div className="svg_bottom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#f0eeee"
                      fill-opacity="1"
                      d="M0,192L21.8,213.3C43.6,235,87,277,131,261.3C174.5,245,218,171,262,154.7C305.5,139,349,181,393,181.3C436.4,181,480,139,524,101.3C567.3,64,611,32,655,69.3C698.2,107,742,213,785,218.7C829.1,224,873,128,916,106.7C960,85,1004,139,1047,138.7C1090.9,139,1135,85,1178,90.7C1221.8,96,1265,160,1309,208C1352.7,256,1396,288,1418,304L1440,320L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="service_box">
                <div className="service_image">
                  <img src={product2} alt="banner" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>Backend Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
                <div className="svg_bottom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#f0eeee"
                      fill-opacity="1"
                      d="M0,192L21.8,213.3C43.6,235,87,277,131,261.3C174.5,245,218,171,262,154.7C305.5,139,349,181,393,181.3C436.4,181,480,139,524,101.3C567.3,64,611,32,655,69.3C698.2,107,742,213,785,218.7C829.1,224,873,128,916,106.7C960,85,1004,139,1047,138.7C1090.9,139,1135,85,1178,90.7C1221.8,96,1265,160,1309,208C1352.7,256,1396,288,1418,304L1440,320L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="service_box">
                <div className="service_image">
                  <img src={product3} alt="banner" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>Mobile Application Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
                <div className="svg_bottom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#f0eeee"
                      fill-opacity="1"
                      d="M0,192L21.8,213.3C43.6,235,87,277,131,261.3C174.5,245,218,171,262,154.7C305.5,139,349,181,393,181.3C436.4,181,480,139,524,101.3C567.3,64,611,32,655,69.3C698.2,107,742,213,785,218.7C829.1,224,873,128,916,106.7C960,85,1004,139,1047,138.7C1090.9,139,1135,85,1178,90.7C1221.8,96,1265,160,1309,208C1352.7,256,1396,288,1418,304L1440,320L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="service_box">
                <div className="service_image">
                  <img src={product4} alt="banner" />
                  <div className="tag">
                    <img
                      width="64"
                      height="64"
                      src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/external-tag-marketing-growth-flatart-icons-flat-flatarticons.png"
                      alt="external-tag-marketing-growth-flatart-icons-flat-flatarticons"
                    />
                  </div>
                </div>
                <div className="service_detail">
                  <h4>WordPress Development</h4>
                  <small>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Eos ab a quisquam quibusdam repellat nemo sapiente et ipsam
                    debitis cupiditate?
                  </small>
                </div>
                <div className="svg_bottom">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#f0eeee"
                      fill-opacity="1"
                      d="M0,192L21.8,213.3C43.6,235,87,277,131,261.3C174.5,245,218,171,262,154.7C305.5,139,349,181,393,181.3C436.4,181,480,139,524,101.3C567.3,64,611,32,655,69.3C698.2,107,742,213,785,218.7C829.1,224,873,128,916,106.7C960,85,1004,139,1047,138.7C1090.9,139,1135,85,1178,90.7C1221.8,96,1265,160,1309,208C1352.7,256,1396,288,1418,304L1440,320L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Testimonial */}
          <div className="card4_box_6">
            <div className="testimonial_title">
              <p>Client's Testimonial </p>
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/stickers/100/thumbs-up-down.png"
                alt="thumbs-up-down"
              />
            </div>
            <div className="Testimonial">
            <svg className="qrsvg_bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,160L40,138.7C80,117,160,75,240,64C320,53,400,75,480,101.3C560,128,640,160,720,186.7C800,213,880,235,960,213.3C1040,192,1120,128,1200,106.7C1280,85,1360,107,1400,117.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
              <div className="testimonial_box">
                <Carousel autoPlay="true">
                  <div className="content">
          
                    <div className="name">
                      <p>
                        {"Dummy Name"} <i className="bx bxs-heart"></i>
                      </p>
                    </div>
                    <div className="user_Detail">
                      <img src={banner_img} alt="logo" />
                      <div className="feedbacks">
                        <p>
                          <i className="uil uil-comment-alt-heart"></i>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt dolores maiores.
                        </p>
                      </div>
                    </div>

                    <div className="feedback_date">
                      <small>{"__/_/____"}</small>
                    </div>
                  </div>
                  <div className="content">
                    <div className="name">
                      <p>
                        {"Dummy Name"} <i className="bx bxs-heart"></i>
                      </p>
                    </div>
                    <div className="user_Detail">
                      <img src={avatar} alt="logo" />
                      <div className="feedbacks">
                        <p>
                          <i className="uil uil-comment-alt-heart"></i>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Sunt dolores maiores.
                        </p>
                      </div>
                    </div>

                    <div className="feedback_date">
                      <small>{"__/_/____"}</small>
                    </div>
                  </div>
                </Carousel>
              </div>

    
          
            </div>
          </div>
          {/* QRcode */}
          <div className="card4_box_7">
            <div className="qrcode_container">
              <div className="qrcode_title">
                <h4>QR Code</h4>
                <img
                  width="100"
                  height="100"
                  src="https://img.icons8.com/clouds/100/qr-code.png"
                  alt="qr-code"
                />
              </div>
              <div className="details">
                <div className="left">
                  <img src={qrcode} alt="banner" />
                </div>
                <div className="right">
                  <img src={avatar} alt="logo" />
                  <button>Download QR Code</button>
                </div>
              </div>
            </div>
          </div>
          {/* Gallerys */}

          <div className="card4_box_8">
            <div className="gallery_title">
              <p>Gallery</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/gallery.png"
                alt="gallery"
              />
            </div>
            <div className="gallery_container">
              <img src={banner_img} alt="gallery" />
            </div>
          </div>

          {/* Inquiries */}
          <div className="card4_box_9">
            <div className="inquires_title">
              <p>Inquiries</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/questions.png"
                alt="questions"
              />
            </div>

            <div className="inquiries_container">
              <div className="form_svg_top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#ffffff"
                    fill-opacity="1"
                    d="M0,192L1440,64L1440,320L0,320Z"
                  ></path>
                </svg>
              </div>
              <div className="form_svg_bottom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#ffffff"
                    fill-opacity="1"
                    d="M0,96L1440,288L1440,0L0,0Z"
                  ></path>
                </svg>
              </div>
              <form action="">
                <div className="form_group">
                  <label htmlFor="name">
                    Name <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="text" placeholder="Your Name" />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/gender-neutral-user--v1.png"
                      alt="gender-neutral-user--v1"
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="name">
                    Email <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="email" placeholder="Your Email" />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/email.png"
                      alt="email"
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="name">
                    Phone <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <input type="tel" placeholder="Enter Phone Number" />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/ringing-phone.png"
                      alt="ringing-phone"
                    />
                  </div>
                </div>
                <div className="form_group">
                  <label htmlFor="name">
                    Message <sup style={{ color: "red" }}>*</sup>
                  </label>
                  <div className="input">
                    <textarea
                      name="message"
                      id="message"
                      cols="30"
                      rows="5"
                      placeholder="Enter Your Message Here..."
                    ></textarea>
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/ringing-phone.png"
                      alt="ringing-phone"
                    />
                  </div>
                </div>
                <div className="form_submit">
                  <button type="submit">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/fluency/48/submit-for-approval.png"
                      alt="submit-for-approval"
                    />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Feedback */}
          <div className="card4_box_10">

            <div className="feedback_title">
              <p>Client's Feedback</p>
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/request-feedback.png"
                alt="request-feedback"
              />
            </div>
            <div className="feedback_container">
            {/* <div className="form_svg_top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,0L60,32C120,64,240,128,360,160C480,192,600,192,720,208C840,224,960,256,1080,261.3C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
              </div> */}
              <div className="form_svg_bottom">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ffffff" fill-opacity="1" d="M0,192L205.7,256L411.4,224L617.1,224L822.9,192L1028.6,192L1234.3,288L1440,160L1440,0L1234.3,0L1028.6,0L822.9,0L617.1,0L411.4,0L205.7,0L0,0Z"></path></svg>
              </div>
              <form action="" onSubmit={feedbackFormik.handleSubmit}>
              <div className="form_group">
                <label
                  htmlFor="clientName_Input"
                  className={`${
                    feedbackFormik.errors.userName ? "error" : ""
                  } `}
                >
                  {feedbackFormik.touched.userName &&
                  feedbackFormik.errors.userName
                    ? feedbackFormik.errors.userName
                    : "Your Name"}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="userName"
                  id="userName"
                  // value={userName}
                  // onChange={(e)=>setUserName(e.target.value)}
                  value={feedbackFormik.values.userName}
                  onChange={feedbackFormik.handleChange}
                  onBlur={feedbackFormik.handleBlur}
                />
               
              </div>
              <div className="form_group">
                <label
                  htmlFor="clientFeedBack_Input"
                  className={`${
                    feedbackFormik.errors.userFeedback ? "error" : ""
                  } `}
                >
                  {feedbackFormik.touched.userFeedback &&
                  feedbackFormik.errors.userFeedback
                    ? feedbackFormik.errors.userFeedback
                    : "Your FeedBack"}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <textarea
                  id="userFeedback"
                  name="userFeedback"
                  cols="30"
                  rows="7"
                  placeholder="Enter your Feedback"
                  // value={userFeedback}
                  // onChange={(e)=>setUserFeedback(e.target.value)}
                  value={feedbackFormik.values.userFeedback}
                  onChange={feedbackFormik.handleChange}
                  onBlur={feedbackFormik.handleBlur}
                ></textarea>
             
              </div>
              <div className="form_group">
                <label
                  htmlFor="clientName_Input"
                  className={`${
                    feedbackFormik.errors.currentRatting ? "error" : ""
                  } `}
                >
                  {feedbackFormik.touched.currentRatting &&
                  feedbackFormik.errors.currentRatting
                    ? feedbackFormik.errors.currentRatting
                    : "Ratting"}
                  <span>
                    <sup>*</sup>
                  </span>
                </label>
                <div
                  className="ratting_container"
                  data-rating="0"
                  name="currentRatting"
                  id="currentRatting"
                  onMouseOver={handleRatting}
                  onMouseLeave={removeRatting}
                  onClick={RattingSetted}
                  // value={currentRatting}
                  // onChange={(e)=>setCurrentRatting(e.target.value)}
                  value={feedbackFormik.values.currentRatting}
                  onChange={feedbackFormik.handleChange}
                  onBlur={feedbackFormik.handleBlur}
                >
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="1"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="2"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="3"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="4"></i>
                  </span>
                  <span className="ratting_star">
                    <i className="bx bxs-star star" data-rating="5"></i>
                  </span>
                </div>
             
              </div>
              <div className="form_actions">
                <button type="submit"><img width="48" height="48" src="https://img.icons8.com/fluency/48/send-comment.png" alt="send-comment"/>Send Feedback</button>
              </div>
            </form>
            </div>
       

            {/* //Feedback messages */}
            <div className="Feedback_container">
              <div className="feeback_title">
                {commentOpen ? (
                  <button onClick={() => setCommentOpen(false)}>
                    <i className="uil uil-feedback"></i>
                    Hide All Feedbacks
                  </button>
                ) : (
                  <button onClick={() => setCommentOpen(true)}>
                    <i className="uil uil-feedback"></i>See All Feedbacks
                  </button>
                )}

                {feedbackLoader ? (
                  <span className="feedBack_loader"></span>
                ) : (
                  ""
                )}
              </div>

              {commentOpen ? (
                <div className="comment_box">
             
                  {AllFeedBacks.map((data, index) => {
                    return (
                      <div className="message" key={index}>
                        <div className="user_detail">
                          <div className="profile">
                            <img src={profile} alt="profile" />
                          </div>
                          <div className="details">
                            <div className="userName">
                              <p>
                                {data.userName}
                                <i className="bx bxs-user-check"></i>
                              </p>
                            </div>
                            <div className="stars">
                              <div
                                className="ratting_container1"
                                data-rating={data.currentRatting}
                                name="currentRatting"
                                // id="currentRatting"
                                id={
                                  data.currentRatting == 0
                                    ? "noRatting"
                                    : "" || data.currentRatting == 1
                                    ? "singleRatting"
                                    : "" || data.currentRatting == 2
                                    ? "doubleRatting"
                                    : "" || data.currentRatting == 3
                                    ? "ThreeRatting"
                                    : "" || data.currentRatting == 4
                                    ? "fourRatting"
                                    : "" || data.currentRatting == 5
                                    ? "fullRatting"
                                    : ""
                                }
                                value={data.currentRatting}
                              >
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="1"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="2"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="3"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="4"
                                  ></i>
                                </span>
                                <span className="ratting_star">
                                  <i
                                    className="bx bxs-star star1"
                                    data-rating="5"
                                  ></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="comments">
                          <i className="bx bx-chat"></i>
                          <span>{data.userFeedback}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
        

          </div>
              {/* Footer */}
              <div className="card4_box_11">
                <div className="footer_container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,64L80,90.7C160,117,320,171,480,160C640,149,800,75,960,64C1120,53,1280,107,1360,133.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                <p>All Copyright Reserved &copy; 2024 myvirtualcard.in</p>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default NewCardDesign4;
