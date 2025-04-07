import React,{useState} from 'react'

const GooglesheetsForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
      const [isSubmitting,setIsSubmitting]=useState(false)
      const [submitStatus,setSubmitStatus]=useState('');

      const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormData(previousData=>({
            ...previousData,[name]:value
        }))

      }
      const handleSubmit=async (event)=>{
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try{
            const response = await fetch('https://script.google.com/macros/s/AKfycbxvtvJVQl0SvVK07UGqls60PZDACMGK8imd6--TeS4cstKDQlP_Fu3X0SCGvVY35lpU/exec',{
                method:'POST',
                mode:'no-cors',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            });
            if (response.ok){
                setSubmitStatus('Success! Data saved to Google Sheets');
                setFormData({
                    name:'',
                    email:'',
                    message:''
                });
            }
            else{
                setSubmitStatus('Error! Something went wrong');
            }
        }
        catch(error){
            setSubmitStatus('Network Error. Please try again.');
        }
        finally{
            setIsSubmitting(false);
            {setFormData({
                name: "",
                email: "",
                message: "",
              })}
        }
      }
return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 text-white font-medium rounded-md shadow-sm ${
                        isSubmitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                
            </form>
            {/* {submitStatus && (
                <p
                    className={`mt-4 text-center text-sm ${
                        submitStatus.includes("Success")
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {submitStatus}
                </p>
            )} */}
        </div>
    </div>
);
}

export default GooglesheetsForm