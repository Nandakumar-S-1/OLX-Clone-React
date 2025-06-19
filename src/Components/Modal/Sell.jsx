


import { Modal, ModalBody } from "flowbite-react";
import Input from "../Input/Input";
import React, { useState, useImperativeHandle, useRef, forwardRef } from "react";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { fetchFromFireStore, firestore } from "../Firebase/Firebase";
import { userAuth } from "../Context/Auth";
import fileUpload from "../../assets/fileUpload.svg";
import loading from "../../assets/loading.gif";
import close from '../../assets/close.svg';

const Sell = forwardRef((props, ref) => {
  const { toggleModalSell, status, setItems, onUpdate, editItem } = props;
  const [title, setTitle] = useState(editItem?.title || "");
  const [category, setCategory] = useState(editItem?.category || "");
  const [price, setPrice] = useState(editItem?.price?.toString() || "");
  const [description, setDescription] = useState(editItem?.description || "");
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const auth = userAuth();

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    },
    dataset: { itemId: editItem?.id || '' }
  }));

  const inputRefs = useRef([null, null, null, null]);
  const validateInput = (val, index) => {
    const trimmedVal = val.trim();
    if (!trimmedVal) {
      alert(`${['Title', 'Category', 'Price', 'Description'][index]} is required`);
      return false;
    }
    if (index === 2 && isNaN(Number(trimmedVal))) {
      alert('Price must be a number');
      return false;
    }
    return true;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB');
        return;
    }
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        alert('Only JPG, PNG, and SVG files are allowed');
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth?.user) {
      alert("Please login to continue");
      return;
    }

    if (!validateInput(title, 0) || !validateInput(category, 1) || !validateInput(price, 2) || !validateInput(description, 3)) {
      return;
    }

    setSubmitting(true);

    const readImageAsDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    let imageUrl = editItem?.imageUrl || "";
    if (image && !editItem) {
      try {
        imageUrl = await readImageAsDataUrl(image);
      } catch (error) {
        console.log("Error in image", error);
        alert("Failed to read image");
        setSubmitting(false);
        return;
      }
    }

    const productData = {
      title: title.trim(),
      category: category.trim(),
      price: Number(price.trim()),
      description: description.trim(),
      imageUrl,
      userId: auth.user.uid,
      userName: auth.user.displayName || "Anonymous",
      createdAt: editItem?.createdAt || new Date().toDateString(),
    };

    try {
      if (editItem) {
        await onUpdate({ ...editItem, ...productData });
      } else {
        const docRef = await addDoc(collection(firestore, "Products"), productData);
        const datas = await fetchFromFireStore();
        setItems(datas);
      }
      toggleModalSell();
      setTitle("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.log(error, "HandleSubmit error");
      alert("Failed to add/update item to Firestore");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        onClick={toggleModalSell}
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-grey-700",
          },
        }}
        className="bg-black"
        position={"center"}
        size="md"
        popup={true}
        show={status}
      >
        <ModalBody
          className="bg-white h-96 p-0 rounded-md"
          onClick={(event) => event.stopPropagation()}
        >
          <img
            onClick={() => {
              toggleModalSell();
              setImage(null);
            }}
            className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
            src={close}
            alt=""
          />
          <div className="p-6 pl-8 pr-8 pb-8">
            <p className="font-bold text-lg mb-3">{editItem ? "Edit Item" : "Sell Item"}</p>
            <form onSubmit={handleSubmit} action="">
              <Input ref={el => inputRefs.current[0] = el} setInput={setTitle} placeholder="Title" value={title} onValidate={val => validateInput(val, 0)} />
              <Input ref={el => inputRefs.current[1] = el} setInput={setCategory} placeholder="Category" value={category} onValidate={val => validateInput(val, 1)} />
              <Input ref={el => inputRefs.current[2] = el} setInput={setPrice} placeholder="Price" value={price} onValidate={val => validateInput(val, 2)} />
              <Input ref={el => inputRefs.current[3] = el} setInput={setDescription} placeholder="Description" value={description} onValidate={val => validateInput(val, 3)} />

              <div className="pt-2 w-full relative">
                {image || editItem?.imageUrl ? (
                  <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                    <img
                      className="object-contain"
                      src={image ? URL.createObjectURL(image) : editItem?.imageUrl}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                    <input
                      onChange={handleImageUpload}
                      className="absolute inset-10 h-full opacity-0 cursor-pointer z-30"
                      type="file"
                    />
                    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                      <img className="w-12" src={fileUpload} alt="" />
                      <p className="text-center text-sm pt-2">Click to Upload Images</p>
                      <p className="text-center text-sm pt-2">SVG,PNG,JPG</p>
                    </div>
                  </div>
                )}
              </div>

              {submitting ? (
                <div className="w-full flex h-14 justify-center pt-4 pb-2">
                  <img className="w-32 object-cover" src={loading} alt="" />
                </div>
              ) : (
                <div className="w-full pt-2">
                  <button
                    className="w-full p-3 rounded-lg text-white"
                    style={{ backgroundColor: "#002f34" }}
                  >
                    {editItem ? "Update Item" : "Sell Item"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
});

export default Sell;


// import { Modal, ModalBody } from "flowbite-react";
// import Input from "../Input/Input";
// import React, { useState, useImperativeHandle,useRef, forwardRef } from "react";
// import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
// import { fetchFromFireStore, firestore } from "../Firebase/Firebase";
// import { userAuth } from "../Context/Auth";
// import fileUpload from "../../assets/fileUpload.svg";
// import loading from "../../assets/loading.gif";
// import close from '../../assets/close.svg';

// const Sell = forwardRef((props, ref) => {
//   const { toggleModalSell, status, setItems, onUpdate, editItem } = props;
//   const [title, setTitle] = useState(editItem?.title || "");
//   const [category, setCategory] = useState(editItem?.category || "");
//   const [price, setPrice] = useState(editItem?.price?.toString() || "");
//   const [description, setDescription] = useState(editItem?.description || "");
//   const [image, setImage] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const auth = userAuth();

//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       if (inputRefs.current[0]) inputRefs.current[0].focus();
//     },
//     dataset: { itemId: editItem?.id || '' }
//   }));

//   const inputRefs = useRef([null, null, null, null]);
//   const validateInput = (val, index) => {
//     const trimmedVal = val.trim();
//     if (!trimmedVal) {
//       alert(`${['Title', 'Category', 'Price', 'Description'][index]} is required`);
//       return false;
//     }
//     if (index === 2 && isNaN(Number(trimmedVal))) {
//       alert('Price must be a number');
//       return false;
//     }
//     return true;
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         alert('Image size must be less than 2MB');
//         return;
//       }
//       if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
//         alert('Only JPG, PNG, and SVG files are allowed');
//         return;
//       }
//       setImage(file);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!auth?.user) {
//       alert("Please login to continue");
//       return;
//     }

//     if (!validateInput(title, 0) || !validateInput(category, 1) || !validateInput(price, 2) || !validateInput(description, 3)) {
//       return;
//     }

//     setSubmitting(true);

//     const readImageAsDataUrl = (file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     };

//     let imageUrl = editItem?.imageUrl || "";
//     if (image && !editItem) {
//       try {
//         imageUrl = await readImageAsDataUrl(image);
//       } catch (error) {
//         console.log("Error in image", error);
//         alert("Failed to read image");
//         setSubmitting(false);
//         return;
//       }
//     }

//     const productData = {
//       title: title.trim(),
//       category: category.trim(),
//       price: Number(price.trim()),
//       description: description.trim(),
//       imageUrl,
//       userId: auth.user.uid,
//       userName: auth.user.displayName || "Anonymous",
//       createdAt: editItem?.createdAt || new Date().toDateString(),
//     };

//     try {
//       if (editItem) {
//         await onUpdate({ ...editItem, ...productData });
//       } else {
//         const docRef = await addDoc(collection(firestore, "Products"), productData);
//         const datas = await fetchFromFireStore();
//         setItems(datas);
//       }
//       toggleModalSell();
//       setTitle("");
//       setCategory("");
//       setPrice("");
//       setDescription("");
//       setImage(null);
//     } catch (error) {
//       console.log(error, "HandleSubmit error");
//       alert("Failed to add/update item to Firestore");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Modal
//         onClick={toggleModalSell}
//         theme={{
//           content: {
//             base: "relative w-full p-4 md:h-auto",
//             inner: "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-grey-700",
//           },
//         }}
//         className="bg-black"
//         position={"center"}
//         size="md"
//         popup={true}
//         show={status}
//       >
//         <ModalBody
//           className="bg-white h-96 p-0 rounded-md"
//           onClick={(event) => event.stopPropagation()}
//         >
//           <img
//             onClick={() => {
//               toggleModalSell();
//               setImage(null);
//             }}
//             className="w-6 absolute z-10 top-6 right-8 cursor-pointer"
//             src={close}
//             alt=""
//           />
//           <div className="p-6 pl-8 pr-8 pb-8">
//             <p className="font-bold text-lg mb-3">{editItem ? "Edit Item" : "Sell Item"}</p>
//             <form onSubmit={handleSubmit} action="">
//               <Input ref={el => inputRefs.current[0] = el} setInput={setTitle} placeholder="Title" value={title} onValidate={val => validateInput(val, 0)} />
//               <Input ref={el => inputRefs.current[1] = el} setInput={setCategory} placeholder="Category" value={category} onValidate={val => validateInput(val, 1)} />
//               <Input ref={el => inputRefs.current[2] = el} setInput={setPrice} placeholder="Price" value={price} onValidate={val => validateInput(val, 2)} />
//               <Input ref={el => inputRefs.current[3] = el} setInput={setDescription} placeholder="Description" value={description} onValidate={val => validateInput(val, 3)} />

//               <div className="pt-2 w-full relative">
//                 {image || editItem?.imageUrl ? (
//                   <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
//                     <img
//                       className="object-contain"
//                       src={image ? URL.createObjectURL(image) : editItem?.imageUrl}
//                       alt=""
//                     />
//                   </div>
//                 ) : (
//                   <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
//                     <input
//                       onChange={handleImageUpload}
//                       className="absolute inset-10 h-full opacity-0 cursor-pointer z-30"
//                       type="file"
//                     />
//                     <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
//                       <img className="w-12" src={fileUpload} alt="" />
//                       <p className="text-center text-sm pt-2">Click to Upload Images</p>
//                       <p className="text-center text-sm pt-2">SVG,PNG,JPG</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {submitting ? (
//                 <div className="w-full flex h-14 justify-center pt-4 pb-2">
//                   <img className="w-32 object-cover" src={loading} alt="" />
//                 </div>
//               ) : (
//                 <div className="w-full pt-2">
//                   <button
//                     className="w-full p-3 rounded-lg text-white"
//                     style={{ backgroundColor: "#002f34" }}
//                   >
//                     {editItem ? "Update Item" : "Sell Item"}
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// });

// export default Sell;

// import { Modal, ModalBody } from "flowbite-react";
// import Input from "../Input/Input";
// import React, { useState } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { fetchFromFireStore, firestore } from "../Firebase/Firebase";
// import { userAuth } from "../Context/Auth";
// import fileUpload from "../../assets/fileUpload.svg";
// import loading from "../../assets/loading.gif";
// import close from '../../assets/close.svg'

// const Sell = (props) => {
//   const { toggleModalSell, status, setItems } = props;

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState(0);
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);

//   const [submitting, setSubmitting] = useState(false);

//   const auth = userAuth();

//   const handleImageUpload = (event) => {
//     if (event.target.files) setImage(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!auth?.user) {
//       alert("please login to continue");
//       return;
//     }

//     setSubmitting(true);

//     const readImageAsDataUrl = (file) => {
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           const imageUrl = reader.result;
//           localStorage.setItem(`image_${file.name}`, imageUrl);
//           resolve(imageUrl);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//       });
//     };
//     let imageUrl = "";
//     if (image) {
//       try {
//         imageUrl = await readImageAsDataUrl(image);
//       } catch (error) {
//         console.log("error in image", error);
//         alert("failed to read image");
//         return;
//       }
//     }

//     const trimTitle = title.trim();
//     const trimCategory = category.trim();
//     const trimPrice = String(price).trim();
//     const trimDescription = description.trim();

//     if (!trimTitle || !trimCategory || !trimPrice || !trimDescription) {
//       alert("All fields are required");
//       setSubmitting(false);
//       return;
//     }

//     try {
//       await addDoc(collection(firestore, "Products"), {
//         title,
//         category,
//         price,
//         description,
//         imageUrl,
//         userId: auth.user.uid,
//         userName: auth.user.displayName || "Anonymous",
//         createAt: new Date().toDateString(),
//       });
//       const datas = await fetchFromFireStore();
//       setItems(datas);

//       toggleModalSell();
//     } catch (error) {
//       console.log(error, "handlesubmit error");
//       alert("failed to add items to the firestore");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Modal
//         onClick={toggleModalSell}
//         theme={{
//           content: {
//             base: "relative w-full p-4 md:h-auto",
//             inner:
//               "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-grey-700",
//           },
//         }}
//         className="bg-black"
//         position={"center"}
//         size="md"
//         popup={true}
//         show={status}
//       >
//         <ModalBody
//           className="bg-white h-96 p-0 rounded-md"
//           onClick={(event) => event.stopPropagation()}
//         >
//             <img onClick={()=>{
//                 toggleModalSell();
//                 setImage(null);
//             }}
//             className="w-6 absolute z-10 top-6 rignt-8 cursor-pointer" src={close} alt="" />
//           <div className="p-6 pl-8 pr-8 pb-8">
//             <p className="font-bold text-lg mb-3">Sell Item</p>
//             <form onSubmit={handleSubmit} action="">
//               <Input setInput={setTitle} placeholder="Title" />
//               <Input setInput={setCategory} placeholder="Category" />
//               <Input setInput={setPrice} placeholder="Price" />
//               <Input setInput={setDescription} placeholder="Description" />

//               <div className="pt-2 w-full relative">
//                 {image ? (
//                   <div className="relative h-40 sm:h-60 w-full flex justify-center  border-2 border-black border-solid rounded-md overflow-hidden">
//                     <img
//                       className="object-contain"
//                       src={URL.createObjectURL(image)}
//                       alt=""
//                     />
//                   </div>
//                 ) : (
//                   <div className="relative h-40 sm:h-60 w-full  border-2 border-black border-solid rounded-md">
//                     <input
//                       onChange={handleImageUpload}
//                       className="absolute inset-10 h-full opacity-0 cursor-pointer z-30"
//                       type="file"
//                       required
//                     />
//                     <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
//                       <img className="w-12" src={fileUpload} alt="" />
//                       <p className="text-center text-sm pt-2">
//                         Click to Upload Images
//                       </p>
//                       <p className="text-center text-sm pt-2">SVG,PNG,JPG</p>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {submitting ? (
//                 <div className="w-full flex h-14 justify-center pt-4 pb-2">
//                   <img className="w-32 object-cover" src={loading} alt="" />
//                 </div>
//               ) : (
//                 <div className="w-full pt-2">
//                   <button
//                     className="w-full p-3 rounded-lg text-white"
//                     style={{ backgroundColor: "#002f34" }}
//                   >
//                     Sell Item
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default Sell;
