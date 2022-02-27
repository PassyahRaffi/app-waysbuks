import { useEffect } from "react";
// import { globalTitle } from "../../components/App";
import { Manggo, UploadIcon } from "../../exports/exportImage";
import { API } from "../../config/api";
import { useState } from "react";

export default function AddTopping() {
  //   useEffect(() => {
  //     document.title = globalTitle + "Add Topping";
  //   }, []);

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      console.log(form);

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("price", form.price);
      formData.set("image", form.image[0], form.image[0].name);

      // Insert product data
      const response = await API.post("/topping", formData, config);
      console.log(response);

      if (response.data.status === "Success") {
        const alert = (
          <div
            className="flex items-center bg-green-600 rounded-md text-white text-sm px-4 py-3"
            role="alert"
          >
            <p>Topping successfully added.</p>
          </div>
        );
        setMessage(alert);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
        setForm({
          title: "",
          price: "",
          image: "",
        });
      } else {
        const alert = (
          <div
            className="flex justify-center items-center bg-red-600 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p>Error. Try Again</p>
          </div>
        );
        console.log(response);
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-4 my-6 md:mx-20 md:my-16 lg:mx-40 xl:mx-32">
      <div className="w-full lg:w-7/12">
        <h4 className="text-3xl lg:text-5xl font-bold font-['Avenir-Black'] text-red-700">
          Add New Topping
        </h4>

        {message && message}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 my-10 font-['Avenir-Book'] text-center"
        >
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Name Topping"
            className="w-full p-3 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md bg-red-100"
          />
          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 outline outline-2 outline-red-500 focus:outline-red-700 rounded-md bg-red-100"
          />
          <label
            htmlFor="image"
            className="block text-left w-full p-3 outline outline-2 cursor-pointer outline-red-500 focus:outline-red-700 rounded-md bg-red-100"
          >
            <div className="flex justify-between">
              <p className="text-sm  opacity-100 font-normal text-gray-400">
                Photo Topping
              </p>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleChange}
                className="sr-only"
              />
              <img className="h-5 mr-2" src={UploadIcon} alt="" />
            </div>
          </label>
          <button
            type="submit"
            className="w-full lg:w-9/12 py-2 rounded-md text-white text-center bg-red-600"
          >
            Add Topping
          </button>
        </form>
      </div>
      {preview && (
        <div className="w-full lg:w-4/12 flex justify-center items-center">
          <img src={preview} alt="preview" className="w-40 lg:w-64" />
        </div>
      )}
    </div>
  );
}
