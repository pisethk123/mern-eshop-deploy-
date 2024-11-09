import React, { useState } from "react";
import {LogIn, Mail, Lock, ArrowRight, Loader} from "lucide-react"
import {Link} from "react-router-dom"
import { useUserStore } from "../store/useUserStore";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {login, loading} = useUserStore()

    const formChangeHandler = (e) => setFormData({...formData, [e.target.id]: e.target.value})

    const submitHandler = e => {
        e.preventDefault()
        login(formData)
    }

  return <div className="flex flex-col m-auto py-12 sm:px-6 lg:px-8 w-full lg:w-1/3">
  <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Create your account</h2>
  <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-3">
      <form onSubmit={submitHandler} className="space-y-6">

          <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Email</label>
              <div className="rounded-md shadow-sm  bg-gray-700 border-gray-600 px-3 py-2 flex space-x-3">
                  <Mail className=" text-gray-400"/>
                  <input 
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={formChangeHandler} 
                      className="w-full placeholder-gray-400 bg-transparent focus:outline-none"
                      placeholder="johndoe@mail.com"/>
              </div>
          </div>

          <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Password</label>
              <div className="rounded-md shadow-sm  bg-gray-700 border-gray-600 px-3 py-2 flex space-x-3">
                  <Lock className=" text-gray-400"/>
                  <input 
                      type="password"
                      id="password"
                      required
                      value={formData.password}
                      onChange={formChangeHandler} 
                      className="w-full placeholder-gray-400 bg-transparent focus:outline-none"
                      placeholder="password"/>
              </div>
          </div>

          <button 
              type="submit" 
              className="w-full py-2 px-4 border border-transparent rounded-md bg-emerald-600 flex justify-center items-center" 
              disabled={loading}>
              {loading?
                  <>
                      <Loader className="mr-2 h-5 w-5 animate-spin"/>
                      Loading...
                  </>: "Log In"
              }
          </button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400">
          Don't an account? 
          <Link to={"/signup"} className="font-meduim text-emerald-400 hover:text-emerald-300">
              Sign up here <ArrowRight className="inline h-4 w-4"/>
          </Link>
      </p>
  </div>
</div>;
};

export default LoginPage;
