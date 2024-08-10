import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";

const Courses = () => {

  // Subjects States

  const [year, setYear] = useState("");
  const [form, setForm] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCover, setSubjectCover] = useState("");
  const [semister, setSemister] = useState([]);
  const [yearWiseData, setYearWiseData] = useState("");
  const [semisterWiseData, setSemisterWiseData] = useState("");
  const [branchName, setBranchName] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [regularSubject, setRegularSubjects] = useState([]);
  const [elective1, setElective1] = useState([]);
  const [elective2, setElective2] = useState([]);
  const [elective3, setElective3] = useState([]);
  const [cloneData, setCloneData] = useState([]);

  // Courses States

  const [active, setActive] = useState(true);
  // const [clone, setClone] = useState([]);
  const [branchWiseData, setBranchWiseData] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseIcon, setCourseIcon] = useState("");
  const [courseForm, setCourseForm] = useState(false);

  // subjects related Functions

  const getSubjects = async () => {
    const res = await axios.get("http://localhost:5000/subjects");
    setSubjects(res.data);
    setCloneData(res.data);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const handleImageSubject = () => {
    const file = document.getElementById("imgInput");
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = (e) => {
      setSubjectCover(e.target.result);
    };
  };

  const postSubjects = async (e) => {
    e.preventDefault();
    const subject = {
      year,
      branchName,
      semister,
      subjectName,
      subjectType,
      subjectCover,
    };
    try{
        await axios.post("http://localhost:5000/subjects", subject);
    }catch(error){
        console.error("Error", error);
        alert("Error in Adding Subject");
    }
    setYear("");
    setBranchName("");
    setSemister("");
    setSubjectName("");
    setSubjectType("");
    setSubjectCover("");
    setForm(false);
    getSubjects();
    alert("subjects updated");
  };

  const openAddSubjectForm = () => {
    return (
      <div className="w-full border-2 border-black p-7 relative shadow-2xl">
        <h2 className="text-center font-bold text-xl">Add Subject</h2>
        <button
          onClick={() => setForm(false)}
          className="absolute right-5 top-4 text-[30px]"
        >
          <IoMdCloseCircle />
        </button>
        <br />
        <form action="" onSubmit={postSubjects}>
          <div className="grid grid-cols-2 ">
            <label className="flex items-center" htmlFor="">
              Subject Name :
            </label>
            <input
              type="text"
              required
              className="p-2 mb-2 shadow-lg  shadow-gray-400 w-[300px] rounded-lg border border-gray-400"
              onChange={(e) => setSubjectName(e.target.value)}
            />
             <label className="flex items-center" htmlFor="">
              Branch Name :
            </label>
            <select
              className="w-full  md:w-[300px]  mb-2 p-3 rounded-md text-gray-700 font-bold shadow-gray-400 shadow-lg outline-none"
              name=""
              required
              onChange={(e) => {
                setBranchName(e.target.value);
              }}
            >
              <option value="">--Select Branch--</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Computer">Computer</option>
              <option value="IT">IT</option>
              <option value="Automobile">Automobile</option>
              <option value="Electronics and Telecommunication">
                Electronics and Telecommunication
              </option>
            </select>
            <label className="flex items-center" htmlFor="">
              Year :
            </label>
            <select
              required
              className="w-full  md:w-[300px]  mb-2 p-3 rounded-md text-gray-700 font-bold shadow-gray-400 shadow-lg outline-none"
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">--Select Year--</option>
              <option value="FirstYear">First Year</option>
              <option value="SecondYear">Second Year</option>
              <option value="ThirdYear">Third Year</option>
              <option value="FinalYear">Final Year</option>
            </select>
            <label className="flex items-center" htmlFor="">
              Semister :
            </label>
            <select
              required
              name=""
              id=""
              className="py-3 w-[300px] text-gray-700 font-bold rounded-lg p-2 mb-2  shadow-gray-400 shadow-lg outline-none"
              onChange={(e) => setSemister(e.target.value)}
            >
              <option value="">-- Select Semister --</option>
              <option value="SEM I">Semister I</option>
              <option value="SEM II">Semister II</option>
              <option value="SEM III">Semister III</option>
              <option value="SEM IV">Semister IV</option>
              <option value="SEM V">Semister V</option>
              <option value="SEM VI">Semister VI</option>
              <option value="SEM VII">Semister VII</option>
              <option value="SEM VIII">Semister VIII</option>
            </select>
           
            <label className="flex items-center" htmlFor="">
              Select Subject Type
            </label>
            <select
              className="w-full  md:w-[300px]  mb-2 p-3 rounded-md text-gray-700 font-bold shadow-gray-400 shadow-lg outline-none"
              name=""
              onChange={(e) => setSubjectType(e.target.value)}
              required
            >
              <option value="">--Select Subject Type--</option>
              <option value="Regular">Regular</option>
              <option value="elective1">Elective I</option>
              <option value="elective2">Elective II</option>
              <option value="elective3">Elective III</option>
            </select>
            <label className="flex items-center" htmlFor="">
              Upload Image :
            </label>
            <input type="file" id="imgInput" onChange={handleImageSubject} />
          </div>
          <div className="w-full text-center mt-3">
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded-lg my-2"              
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  };

  const handleFilter = () => {
    const filterSubjectData = subjects.filter(
      (item) => item.year === yearWiseData && item.semister === semisterWiseData && item.branchName === branchWiseData
    );
    setSubjects(filterSubjectData);
    const regularSubjectData = filterSubjectData.filter(
      (item) => item.subjectType === "Regular"
    );
    setRegularSubjects(regularSubjectData);
    const elective1SubjectData = filterSubjectData.filter(
      (item) => item.subjectType === "elective1"
    );
    setElective1(elective1SubjectData);
    const elective2SubjectData = filterSubjectData.filter(
      (item) => item.subjectType === "elective2"
    );
    setElective2(elective2SubjectData);
    const elective3SubjectData = filterSubjectData.filter(
      (item) => item.subjectType === "elective3"
    );
    setElective3(elective3SubjectData);

   
    const element = document.getElementById("subjectDiv");
    if (element && filterSubjectData.length > 0) {
        element.scrollIntoView({ behavior: 'smooth'   
    });
    }

    // if(filterSubjectData.length === 0){
    //     alert("No Data Found!")
    // }

    if(branchWiseData==="" && yearWiseData.length > 0 && semisterWiseData.length > 0){
        alert("Please Select Branch");
    }

    if(branchWiseData.length > 0 && yearWiseData.length > 0 && semisterWiseData.length > 0 && filterSubjectData.length === 0){
        alert("No Data Found !");
    }
   

    const element2 = document.getElementById("branchWiseSubjectNames");
    if (element2) {
        element2.innerText =branchWiseData;
    }
    setSubjects(cloneData);
  };



  const handleDeleteRegualarSubjects = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Subject?"
    );
    if (userConfirmed) {
      // Perform the delete action
      axios.delete(`http://localhost:5000/subjects/${id}`).then(() => {
        getSubjects();
        const newItems = regularSubject.filter((item) => item.id !== id);
        setRegularSubjects(newItems);
      });
    }
  };

  const handleDeleteElective1Subjects = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Subject?"
    );
    if (userConfirmed) {
      // Perform the delete action
      axios.delete(`http://localhost:5000/subjects/${id}`).then(() => {
        getSubjects();
        const newItems = elective1.filter((item) => item.id !== id);
        setElective1(newItems);
      });
    }
  };

  const handleDeleteElective2Subjects = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Subject?"
    );
    if (userConfirmed) {
      // Perform the delete action
      axios.delete(`http://localhost:5000/subjects/${id}`).then(() => {
        getSubjects();
        const newItems = elective2.filter((item) => item.id !== id);
        setElective2(newItems);
      });
    }
  };

  const handleDeleteElective3Subjects = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Course?"
    );
    if (userConfirmed) {
      // Perform the delete action
      axios.delete(`http://localhost:5000/subjects/${id}`).then(() => {
        getSubjects();
        const newItems = elective3.filter((item) => item.id !== id);
        setElective3(newItems);
      });
    }
  };
  // Course related functions

  const openAddCourseForm = () => {
    return (
      <div className="w-full border-2 border-black p-7 relative shadow-2xl">
        <h2 className="text-center font-bold text-xl">Add Course</h2>
        <button
          onClick={() => setCourseForm(false)}
          className="absolute right-5 top-4 text-[30px]"
        >
          <IoMdCloseCircle />
        </button>
        <br />
        <form action="" onSubmit={postBranches}>
          <div className="grid grid-cols-2 ">
            <label htmlFor="" className="p-2 m-2">
              Branch Name
            </label>
            <input
              type="text"
              className="p-2 m-2 border border-gray-400"
              onChange={(e) => setCourseName(e.target.value)}
            />
            <label htmlFor="" className="p-2 m-2">
              Upload Image
            </label>
            <input
              type="file"
              className="m-2 p-2"
              id="imgInput"
              onChange={handleImageCourse}
            />
          </div>
          <div className="w-full text-center">
            <button
              type="submit"
              className="w-full p-2 bg-green-500 text-white rounded-lg my-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  const handleClick = (id, branch) => {
    setActive(id);
    setBranchWiseData(branch);
  };

  useEffect(()=>{
    getCourseData();
  },[branchWiseData])


  const handleImageCourse = () => {
    const file = document.getElementById("imgInput");
    const reader = new FileReader();
    reader.readAsDataURL(file.files[0]);
    reader.onload = (e) => {
      setCourseIcon(e.target.result);
    };
   
  };

  const getCourseData = async () => {
    const response = await axios.get("http://localhost:5000/branches");
    setCourses(response.data);
    // setClone(response.data);
  };

  

  const postBranches = async (e) => {
    e.preventDefault();

    const data = { courseName, courseIcon };
    try {
      await axios.post("http://localhost:5000/branches", data);
    } catch (error) {
      console.error("Error", error);
      alert(
        "Error in posting Branch plz start the JSON server First at 5000 port"
      );
    }
    getCourseData();
    setCourseForm(false);
    setCourseName("");
    setCourseIcon("");
  };

  const handleDeleteCourse = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Course?"
    );
    if (userConfirmed) {
      // Perform the delete action
      axios.delete(`http://localhost:5000/branches/${id}`).then(() => {
        getCourseData();
      });
    }
  };

  return (


    <div className="w-full text-left bg-slate-200">

        {/* search Bar  */}

      <div className="w-full text-left bg-slate-200 ">
        <div className="ml-3 mt-2">
      <select
        className="w-full  md:w-[300px]  mb-2 p-3 rounded-md text-gray-700 font-bold shadow-gray-400 shadow-lg outline-none cursor-pointer"
        onChange={(e) => setYearWiseData(e.target.value)}
      >
        <option value="">--Select Year--</option>
        <option value="FirstYear">First Year</option>
        <option value="SecondYear">Second Year</option>
        <option value="ThirdYear">Third Year</option>
        <option value="FinalYear">Final Year</option>
      </select>

      <select
        name=""
        id=""
        className="py-3 w-[300px] text-gray-700 font-bold rounded-lg p-2 m-2 shadow-lg  shadow-gray-400 outline-none cursor-pointer"
        onChange={(e) => setSemisterWiseData(e.target.value)}
      >
        <option value="">-- Select Semister --</option>
        <option value="SEM I">Semister I</option>
        <option value="SEM II">Semister II</option>
        <option value="SEM III">Semister III</option>
        <option value="SEM IV">Semister IV</option>
        <option value="SEM V">Semister V</option>
        <option value="SEM VI">Semister VI</option>
        <option value="SEM VII">Semister VII</option>
        <option value="SEM VIII">Semister VIII</option>
      </select>

      <button
        className="p-3 rounded-lg shadow-lg  shadow-gray-400 bg-white ml-5 font-bold text-gray-700"
        onClick={handleFilter}
      >
        <IoSearch className="inline-block text-xl mr-2" />
        Search
      </button>

      <button
        className=" bg-green-400 p-3 text-white font-bold rounded-lg ml-[200px]"
        onClick={() => setForm(true)}
      >
        <FaPlusCircle className="inline-block mr-2 text-xl" />
        Add Subject
      </button>
       
      </div>
        
        {/* courses list  */}


        <div className="">
          <br />

          <div className="flex flex-wrap justify-center md:justify-start mb-4 ">
            {courses.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    active === item.id ? "border-2 border-black " : ""
                  }text-center w-[170px] h-auto m-2 hover:scale-95 bg-white shadow-2xl relative cursor-pointer`}
                  onClick={() => handleClick(item.id, item.courseName)}
                >
                  <RiDeleteBin5Line
                    title="Delete Course"
                    onClick={() => handleDeleteCourse(item.id)}
                    className="absolute right-2 top-2 cursor-pointer text-[20px] text-gray-500"
                  ></RiDeleteBin5Line>
                  <div className="w-[100px] h-[100px] p-5">
                    <img
                      src={item.courseIcon}
                      alt="No pic"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="pb-2 font-bold text-gray-700">
                    {item.courseName}
                  </p>
                </div>
              );
            })}

            <div
              className="text-center w-[170px] h-auto m-2 hover:scale-95 bg-white shadow-2xl"
              onClick={() => setCourseForm(true)}
              title="Add Course"
            >
              <div className="w-[100px] h-[100px] p-5">
                <FaPlus className="w-full h-full text-gray-500" />
              </div>
            </div>
          </div>
        </div>

            {/* Add course Form  */}
            
        <div className="absloute fixed top-[30%] left-[30%] bg-white z-50 w-[40%]">
          {courseForm && openAddCourseForm()}
        </div>
      </div>

    

      

            

      <div className="py-5" id="subjectDiv">
      <div className="flex items-start bg-gray-700 border border-white rounded-lg " >
        <div className="flex items-center justify-center font-bold text-[20px] p-3"><span id="branchWiseSubjectNames" className="mr-1 text-white"></span><span className="text-white"> Subjects</span><MdOutlineKeyboardArrowRight className="text-white ml-3"/></div>
      </div>
      </div>

      <div>
        

        {/* <p className="ml-3 font-bold py-2">Elective Subjects</p> */}
        <div className="w-full flex gap-5 flex-wrap">

            {/* regular subject design */}

        <div className="w-auto h-auto border-2 border-gray-300 p-3">
            <p className="text-center py-2 font-semibold"> Regular Subjects</p>
            <div className="w-full flex   justify-start  h-auto">
              {
                regularSubject.length > 0 ? (regularSubject.map((item) => {
                    return (
                      <div className="w-[120px] h-auto m-2 relative" key={item.id}>
                        <RiDeleteBin5Line
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => handleDeleteRegualarSubjects(item.id)}
                        />
                        <div className="w-[120px] h-[120px] shadow-2xl ">
                          <img
                            src={item.subjectCover}
                            alt=""
                            className="h-full w-full bg-white p-5"
                          />
                        </div>
                        <div className="flex justify-center items-center h-[40px] bg-white border-t border-gray-200">
                          <p className="text-xs text-center text-black font-bold w-full text-wrap">
                            {item.subjectName}
                          </p>
                        </div>
                      </div>
                    );
                  })) : <div className="w-full h-[160px] flex items-center justify-center bg-white text-black font-bold m-2">No data</div>
            }
            </div>
          </div>

        {/* elective 1 design */}

        <div className="w-auto h-auto border-2 border-gray-300 p-3">
            <p className="text-center py-2 font-semibold">Elective Subjects 1</p>
            <div className="w-full flex   justify-start  h-auto">
              {
                elective1.length > 0 ? (elective1.map((item) => {
                    return (
                      <div className="w-[120px] h-auto m-2 relative" key={item.id}>
                        <RiDeleteBin5Line
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => handleDeleteElective1Subjects(item.id)}
                        />
                        <div className="w-[120px] h-[120px] shadow-2xl ">
                          <img
                            src={item.subjectCover}
                            alt=""
                            className="h-full w-full bg-white p-5"
                          />
                        </div>
                        <div className="flex justify-center items-center h-[40px] bg-white border-t border-gray-200">
                          <p className="text-xs text-center text-black font-bold w-full text-wrap">
                            {item.subjectName}
                          </p>
                        </div>
                      </div>
                    );
                  })) : <div className="w-full h-[160px] flex items-center justify-center bg-white text-black font-bold m-2">No data</div>
            }
            </div>
          </div>

            {/* elective 2 design */}

          <div className="w-auto h-auto border-2 border-gray-300 p-3">
            <p className="text-center py-2 font-semibold">Elective Subjects 2</p>
            <div className="w-full flex  justify-start  h-auto">
              {
                elective2.length > 0 ? (elective2.map((item) => {
                    return (
                      <div className="w-[120px] h-auto m-2 relative" key={item.id}>
                        <RiDeleteBin5Line
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => handleDeleteElective2Subjects(item.id)}
                        />
                        <div className="w-[120px] h-[120px] shadow-2xl ">
                          <img
                            src={item.subjectCover}
                            alt=""
                            className="h-full w-full bg-white p-5"
                          />
                        </div>
                        <div className="flex justify-center items-center h-[40px] bg-white border-t border-gray-200">
                          <p className="text-xs text-center text-black font-bold w-full text-wrap">
                            {item.subjectName}
                          </p>
                        </div>
                      </div>
                    );
                  })) : <div className="w-full h-[160px] flex items-center justify-center bg-white text-black font-bold m-2">No data</div>
            }
            </div>
          </div>

          {/* elective 3 design */}

          <div className="w-auto h-auto border-2 border-gray-300 p-3">
            <p className="text-center py-2 font-semibold">Elective Subjects 3</p>
            <div className="w-full flex  justify-start  h-auto">
              {
                elective3.length > 0 ? (elective3.map((item) => {
                    return (
                      <div className="w-[120px] h-auto m-2 relative" key={item.id}>
                        <RiDeleteBin5Line
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => handleDeleteElective3Subjects(item.id)}
                        />
                        <div className="w-[120px] h-[120px] shadow-2xl ">
                          <img
                            src={item.subjectCover}
                            alt=""
                            className="h-full w-full bg-white p-5"
                          />
                        </div>
                        <div className="flex justify-center items-center h-[40px] bg-white border-t border-gray-200">
                          <p className="text-xs text-center text-black font-bold w-full text-wrap">
                            {item.subjectName}
                          </p>
                        </div>
                      </div>
                    );
                  })) : <div className="w-full h-[160px] flex items-center justify-center bg-white text-black font-bold m-2">No data</div>
            }
            </div>
          </div>
          
        </div>
      </div>
      <div className="absloute fixed top-[20%] left-[25%] bg-white z-50 w-[50%] overflow-auto">
        {form && openAddSubjectForm()}
      </div>
    </div>
  );
};

export default Courses;
