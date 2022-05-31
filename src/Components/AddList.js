import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message";
import { v4 } from 'uuid'


function AddList() {
  const [count, setcount] = useState(0)

  const { register, watch, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      gender: '',
      email: '',
      address: '',
      country: '',
      state: '',
      pin: '',
      prof_info: {
        skills: [],
        experience: [
          {
            id: v4(),
            comp_name: '',
            duration: null,
            responsibilities: ''
          },
          {
            id: v4(),
            comp_name: '',
            duration: null,
            responsibilities: ''
          }]
      }
    },
    criteriaMode: "all"
  });

  const RemoveHndler = (id) => {
    if (getValues().prof_info.experience.length > 2) {
      setValue('prof_info.experience', getValues().prof_info.experience.filter((ele, index) => (index !== id)))
    }
    else {
      alert("Minimum 2 experience requried")
    }

  }


  const AddExp = () => {
    if (getValues().prof_info.experience.length < 5) {
      setValue('prof_info.experience', [...getValues().prof_info.experience,
      {
        id: v4(),
        comp_name: '',
        duration: null,
        responsibilities: ''
      }
      ])
    }
    else {
      alert(" Max experience 5")
    }


  }

const onSubmit = data => {  
  console.log(data)
const DataArr=JSON.parse(localStorage.getItem("Data"))||[]
DataArr.push(data);
localStorage.setItem("Data",JSON.stringify(DataArr));
alert("data added")
  };

  return (
    <div className="container my-4">
      <main>
        <div className="py-5 text-center">
          <h2>Add Candidate</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-5">
            <div className="col-md-7 col-lg-8 ms-auto me-auto">
              <h4 className="mb-3">Basic Info</h4>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">First name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='firstname'  {...register("firstname", { required: true, maxLength: 80 })} />
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="firstname" message="This is required" />
                  </span>
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Last name <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='lastname' {...register("lastname", { required: true, maxLength: 80 })} />
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="lastname" message="This is required" />
                  </span>
                </div>


                <div className="col-12">
                  <label className="form-label">Gender <span className='text-danger'>*</span></label>

                  <div className=" input-group mb-3 d-flex flex-row " name="gender">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" {...register("gender", { required: true })} type="radio" value="Male" />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" {...register("gender", { required: true })} type="radio" value="FeMale" />

                      <label className="form-check-label">Female</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" {...register("gender", { required: true })} type="radio" value="Other" />
                      <label className="form-check-label">Other</label>
                      <span className='text-danger'>
                        <ErrorMessage className="text-danger" errors={errors} name="gender" message="This is required" />
                      </span>
                    </div>


                  </div>



                </div>

                <div className="col-12">
                  <label className="form-label">Email <span className='text-danger'>*</span></label>
                  <input type="email" className="form-control" name='email' placeholder="you@example.com"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Must be Valid Email"

                      }
                    })} />
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="email" message="This is required" />
                  </span>
                </div>

                <div className="col-12">
                  <label className="form-label">Address <span className='text-danger'>*</span></label>
                  <textarea className="form-control" name='address' placeholder="1234 Main St" {...register("address", { required: true })}></textarea>
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="address" message="This is required" />
                  </span>
                </div>

                <div className="col-md-5">
                  <label className="form-label">Country <span className='text-danger'>*</span></label>
                  <select className="form-select" name='country' {...register("country", { required: true })}>
                    <option value="">Choose...</option>
                    <option>India</option>
                    <option>United States</option>
                  </select>
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="country" message="This is required" />
                  </span>
                </div>

                <div className="col-md-4">
                  <label className="form-label">State <span className='text-danger'>*</span></label>
                  <select className="form-select" name='state' {...register("state", { required: true })}>
                    <option value="">Choose...</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                  </select>
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="state" message="This is required" />
                  </span>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Pin / Zip <span className='text-danger'>*</span></label>
                  <input type="text" className="form-control" name='pin'
                    {...register("pin", {
                      required: true,
                      pattern: {
                        value: /\d+/,
                        message: "This input is number only."
                      },
                      minLength: {
                        value: 6,
                        message: "Minimum 6 digit required."
                      }
                    }
                    )} />
                  <span className='text-danger'>
                    <ErrorMessage className="text-danger" errors={errors} name="pin" message="This is required" />
                  </span>
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Professional Info </h4>
              {/* skill */}
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">
                    Choose your skills
                    <span className="small text-muted">(min 3 skills)  <span className='text-danger'>*</span></span>
                  </label>
                  <div className="mb-3" name="checkbox1">


                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="Angular" {...register("prof_info.skills", { required: true })} />
                      <label className="form-check-label">Angular</label>

                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="React" {...register("prof_info.skills", { required: true })} />
                      <label className="form-check-label">React</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="Node.JS" {...register("prof_info.skills", { required: true })} />
                      <label className="form-check-label">Node.JS</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="JavaScript" {...register("prof_info.skills", { required: true })} />
                      <label className="form-check-label">JavaScript</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="Flutter"  {...register("prof_info.skills", { required: true })} />
                      <label className="form-check-label">Flutter</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" value="Java" {...register("prof_info.skills", { required: true })} />
                      <label className="form-check-label">Java</label>
                    </div>

                    {/* {console.log(errors.prof_info?.skills)} */}

                    {errors.prof_info?.skills && <span className='text-danger'>skills is required</span>}

                  </div>
                </div>
              </div>

              {/* experience */}

              <div className="row gy-3">
                <div className="col-12">
                  <label className="form-label">
                    <strong>
                      Experience <span className='text-danger'>*</span>
                      <span className="small text-muted">(min 2, max 5 items) </span>
                    </strong>
                  </label>

                  {/* { prof_info.experience.map(ele,index)=>console.log(ele)} */}
                  {
                    watch('prof_info.experience').map((ele, index) => (
                      <div key={index} className="card mx-3 mt-3">
                        <div className="card-body">
                          <h6 className="card-title text-muted mb-3">
                            {`Experience ${index + 1}`}
                            {
                              (index <= 1) ? <span className='text-danger'>*</span> : ""
                            }
                            <p className="float-end text-danger fw-normal border-0 pointer " onClick={() => RemoveHndler(index)} >Remove</p>
                          </h6>
                          <div className="row g-3">
                            <div className="col-6">
                              <label className="form-label">Company Name</label>
                              <input type="text" className="form-control" name='cname' {...register(`prof_info.experience[${index}].comp_name`, { required: true })} />
                              {
                                (index <= 1) ? <span className='text-danger'>
                                  <ErrorMessage className="text-danger" errors={errors} name="cname" message="This is required" />
                                </span> : ""
                              }
                            </div>
                            <div className="col-6">
                              <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                              <input type="number" className="form-control" {...register(`prof_info.experience[${index}].duration`, { required: true })} />
                            </div>
                            <div className="col-12">
                              <label className="form-label">Describe your responsibilities</label>
                              <textarea className="form-control" {...register(`prof_info.experience[${index}].responsibilities`, { required: true })} ></textarea>
                            </div>

                          </div>
                        </div>
                      </div>
                    )

                    )
                  }



                  <p className="mt-3 border-0 pointer" onClick={AddExp}>Add more experience</p>
                </div>
              </div>

              <hr className="my-4" />


              <button className="btn btn-primary" type="submit" >Save Candidate</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default AddList


// <div className='m-auto' >
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className='ali'>
//                     <div className='d-flex'>

//                         <div className='input-group mb-3'>
//                             <input className='' type="text" placeholder="First name" {...register("First name", { required: true, maxLength: 80 })} />
//                         </div >

//                         <div className='input-group mb-3'>
//                             <input type="text" placeholder="Last name" {...register("Last name", { required: true, maxLength: 100 })} />
//                         </div>
//                     </div>


//                     <div className='input-group mb-3'>
//                         <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
//                     </div>

//                     <div className='input-group mb-3'>

//                         <input type="tel" placeholder="Mobile number" {...register("Mobile number", { required: true, minLength: 6, maxLength: 12 })} />
//                     </div>

//                     <div className='input-group mb-3'>
//                         <select {...register("Title", { required: true })}>
//                             <option >choice value</option>
//                             <option value="Mr">Mr</option>
//                             <option value="Mrs">Mrs</option>
//                             <option value="Miss">Miss</option>
//                             <option value="Dr">Dr</option>
//                         </select>
//                     </div>

//                     <div className=" input-group mb-3 d-flex flex-row ">
//                         <label>Male</label>
//                         <input {...register("Gender", { required: true })} type="radio" value="Male" />
//                         <label>Female</label>
//                         <input {...register("Gender", { required: true })} type="radio" value="FeMale" />
//                         <label>Other</label>
//                         <input {...register("Gender", { required: true })} type="radio" value="Other" />
//                     </div>
//                     <input type="submit" />
//                 </div>

//             </form>
//         </div>

// mnmnmn
{/* <div className="container my-4">
<main>
  <div className="py-5 text-center"> 
    <h2>Add Candidate</h2>
  </div>

  <div className="row g-5">
    <div className="col-md-7 col-lg-8 ms-auto me-auto">
      <h4 className="mb-3">Basic Info</h4>
      <div className="row g-3">
        <div className="col-sm-6">
          <label className="form-label">First name</label>
          <input type="text" className="form-control">
        </div>

        <div className="col-sm-6">
          <label className="form-label">Last name</label>
          <input type="text" className="form-control">
        </div>

        <div className="col-12">
          <label className="form-label">Gender</label>
          <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio">
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio">
              <label className="form-check-label">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio">
              <label className="form-check-label">Other</label>
            </div>
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="you@example.com">
        </div>

        <div className="col-12">
          <label className="form-label">Address</label>
          <textarea className="form-control" placeholder="1234 Main St"></textarea>
        </div>

        <div className="col-md-5">
          <label className="form-label">Country</label>
          <select className="form-select">
            <option value="">Choose...</option>
            <option>India</option>
            <option>United States</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">State</label>
          <select className="form-select">
            <option value="">Choose...</option>
            <option>Maharashtra</option>
            <option>Karnataka</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Pin / Zip</label>
          <input type="text" className="form-control">
        </div>
      </div>

      <hr className="my-4">

      <h4 className="mb-3">Professional Info</h4>

      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">
            Choose your skills
            <span className="small text-muted">(min 3 skills)</span>
          </label>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox">
              <label className="form-check-label">Angular</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox">
              <label className="form-check-label">React</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox">
              <label className="form-check-label">Node.JS</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox">
              <label className="form-check-label">JavaScript</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox">
              <label className="form-check-label">Flutter</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="checkbox">
              <label className="form-check-label">Java</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-3">
        <div className="col-12">
          <label className="form-label">
            <strong>
              Experience
              <span className="small text-muted">(min 2, max 5 items)</span>
            </strong>
          </label>
          <div className="card mx-3 mt-3">
            <div className="card-body">
              <h6 className="card-title text-muted mb-3">
                Experience #1
                <a  className="float-end text-danger fw-normal">Remove</a>
              </h6>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-control">
                </div>
                <div className="col-6">
                  <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                  <input type="number" className="form-control">
                </div>
                <div className="col-12">
                  <label className="form-label">Describe your responsibilities</label>
                  <textarea className="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="card mx-3 mt-3">
            <div className="card-body">
              <h6 className="card-title text-muted mb-3">
                Experience #2
                <a  className="float-end text-danger fw-normal">Remove</a>
              </h6>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-control">
                </div>
                <div className="col-6">
                  <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                  <input type="number" className="form-control">
                </div>
                <div className="col-12">
                  <label className="form-label">Describe your responsibilities</label>
                  <textarea className="form-control"></textarea>
                </div>
              </div>
            </div>
          </div>
          <a className="d-block mt-3" >Add more experience</a>
        </div>
      </div>

      <hr className="my-4">

      <button className="btn btn-primary" type="submit">Save Candidate</button>
    </div>
  </div>
</main>
</div> */}