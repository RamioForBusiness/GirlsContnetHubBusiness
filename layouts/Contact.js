import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaUserAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";
import React, { useRef } from "react";
//import  useState from "react"
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown } from "@nextui-org/react";

const Contact = ({ data }) => {
  const [selected, setSelected] = React.useState(new Set(["Instagram"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const { frontmatter } = data;
  const { title, paragrph, form_action, phone, mail, location } = frontmatter;
  const form = useRef();
  var GoogleCapcha = false;
  //Show Alert of successfull/ or failed
  const AlertSuccess = () => {
    Swal.fire({
      title: "<h3 style='color:#0e0e0e'>" + "Sweet!" + "</h3>",
      icon: "success",
      text: "Thank you for submitting your application the Girls Contnet Hub team will contact you shortly",
      imageUrl: "./images/ThanksMessage.gif",
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "Custom image",
      timer: 4500,
      iconposition: "buttom",
    });
  };

  const AlertFail = () => {
    Swal.fire({
      icon: "error",
      title: "<h3 style='color:#0e0e0e'>" + "Oops..." + "</h3>",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
  };

  const AlertGooglerecapcha = () => {
    Swal.fire({
      title:
        "<h3 style='color:#0e0e0e'>" +
        "Please click the " +
        " <span style='color:#ef4444'><br/>  I'm not a robot checkbox" +
        "</span> <br/> " +
        "to submit the form." +
        "</h3>",
      icon: "warning",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  //Upload file UploadPicture
  ////To uploading a photo be added later 
  // async function UploadPicture() {
  //   const { value: file } = await Swal.fire({
  //     title: "Select image",
  //     input: "file",
  //     inputAttributes: {
  //       accept: "image/*",
  //       "aria-label": "Upload your profile picture",
  //     },
  //   });

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       Swal.fire({
  //         title:
  //           "<h3 style='color:#0e0e0e'>" + "Your uploaded picture" + "</h3>",
  //         imageUrl: e.target.result,
  //         imageAlt: "The uploaded picture",
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  //Google Recapcha
  const onChange = () => {
    GoogleCapcha = true;
  };
  const sendEmail = (e) => {
    if (GoogleCapcha) {
      e.preventDefault();
      // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      emailjs
        .sendForm(
          "service_0ybp1pk",
          "template_iagf9jh",
          form.current,
          "rQEQEUHnfqbKrneGy"
        )
        .then(
          (result) => {
            console.log(result.text);
            AlertSuccess();
            // reset the form after submit
            e.target.reset();
          },
          (error) => {
            AlertFail();
            console.log(error.text);
          }
        );
    } else {
      AlertGooglerecapcha();
      e.preventDefault();
    }
  };
  return (
    <section className="section lg:mt-16">
      <div className="container">
        <div className="row relative pb-16">
          <ImageFallback
            className="-z-[1] object-cover object-top"
            src={"/images/map.svg"}
            fill="true"
            alt="map bg"
            priority={true}
          />
          <div className="lg:col-6">
            {markdownify(
              title,
              "h1",
              "h1 my-10 lg:my-11 lg:pt-11 text-center lg:text-left lg:text-[64px]"
            )}
            <p>{paragrph}</p>
          </div>
          <div className="contact-form-wrapper rounded border border-border p-6 dark:border-darkmode-border lg:col-6">
            <h2>
              Send Us A
              <span className="text-red ml-1.5 inline-flex  items-center text-red-500">
                Message
                <BsArrowRightShort />
              </span>
            </h2>
            <form
              className="contact-form mt-12"
              ref={form}
              onSubmit={sendEmail}
            >
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>Full name</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_name"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>

                    <div>Phone</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_phone"
                  type="number"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>Email Address</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_email"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <div className="space-x-5">
                  <input
                    className="px-2"
                    type="radio"
                    value="Male"
                    name="from_gender"
                  />{" "}
                  Male
                  <input
                    className="px-2"
                    type="radio"
                    value="Female"
                    name="from_gender"
                  />{" "}
                  Female
                  <input
                    className="px-2"
                    type="radio"
                    value="Other"
                    name="from_gender"
                  />{" "}
                  Other
                </div>
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="email">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                    <div>Age</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_age"
                  type="number"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="name">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>Country</div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <input
                  className="form-input w-full"
                  name="from_country"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-8 flex space-x-2">
              <div> Please share a social media account name </div>
                <div>
                  <small className="font-secondary text-sm text-red-500">
                    *
                  </small>
                </div>
                </div>
              <div className="mb-8 flex items-center space-x-4">
                <div>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    color="secondary"
                    css={{ tt: "capitalize" }}
                    
                  >
                    
                  {selectedValue ==='Facebook'&& <div className="px-2"><FaFacebook/></div> }
                  {selectedValue ==='Tiktok'&& <div className="px-2"> <FaTiktok/></div> } 
                  {selectedValue ==='Instagram'&& <div className="px-2"> <FaInstagram/></div> } 
                  {selectedValue ==='Twitter'&& <div className="px-2"> <FaTwitter/></div> } 
                  {selectedValue ==='Youtube'&& <div className="px-2"> <FaYoutube/></div> } 
                  {selectedValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="secondary"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                    className="inline-block"
                  >
                    <Dropdown.Item key="Facebook">
                      <div className="flex items-center space-x-4">
                        <div>
                          <FaFacebook />
                        </div>{" "}
                        <div>Facebook </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item key="Tiktok" >
                      <div className="flex items-center space-x-4">
                        <div>
                          <FaTiktok />
                        </div>{" "}
                        <div>Tiktok </div>
                      </div>{" "}
                    </Dropdown.Item>
                    <Dropdown.Item key="Instagram" >
                      <div className="flex items-center space-x-4">
                        <div>
                          <FaInstagram />
                        </div>{" "}
                        <div>Instagram </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item key="Twitter" >
                      <div className="flex items-center space-x-4">
                        <div>
                          <FaTwitter />
                        </div>{" "}
                        <div>Twitter </div>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item key="Youtube" >
                      <div className="flex items-center space-x-4">
                        <div>
                          <FaYoutube />
                        </div>{" "}
                        <div>Youtube </div>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
             </div>
                <div>
                <input
                  className="form-input w-full"
                  name="from_SocialType" 
                  type="text"
                  value={selectedValue} 
                  hidden='true'
                  placeholder=""
                  required
                />
                <input
                  className="form-input w-full"
                  name="from_SocialName" 
                  type="text"
                  placeholder=""
                  required
                />
                </div>
              </div>
              {/* 
              //To uploading a photo be added later 
              <div className="mb-6">
                <button type="button" onClick={UploadPicture}>
                  Upload
                </button>
                <div>File uploaded</div>
                <input type="file" />
              </div> */}
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="subject">
                  Subject
                  <small className="font-secondary text-sm text-red-500">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="from_subject"
                  type="text"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block font-secondary" htmlFor="message">
                  <div className="flex space-x-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </div>
                    <div>Tell us a bit about yourself/Your message </div>
                    <div>
                      <small className="font-secondary text-sm text-red-500">
                        *
                      </small>
                    </div>
                  </div>
                </label>
                <textarea
                  name="message"
                  className="form-textarea w-full"
                  placeholder=""
                  rows="7"
                />
              </div>
              <div className="mb-6 hover:cursor-pointer">
                <ReCAPTCHA
                  sitekey="6LdwjnIkAAAAAON6qlbzYWN9fPew5-ChTSLTQFi8"
                  onChange={onChange}
                />
              </div>

              <input className="btn btn-primary" type="submit" value="Send" />
            </form>
            {/* <input className="btn btn-primary" type="submit" value="Send" onClick={AlertSuccess} />
            <input className="btn btn-primary" type="submit" value="Send Fail" onClick={AlertFail} /> */}
          </div>
        </div>
        <div className="row">
          {phone && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`tel:${phone}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-red-600 dark:border-darkmode-border"
              >
                <FaUserAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {phone}
                </p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`mailto:${mail}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-red-600 dark:border-darkmode-border"
              >
                <FaEnvelope />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {mail}
                </p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-6 lg:col-4">
              <span
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-red-600 dark:border-darkmode-border"
              >
                <FaMapMarkerAlt />
                <p className="ml-1.5 text-lg font-bold text-dark dark:text-darkmode-light">
                  {location}
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
