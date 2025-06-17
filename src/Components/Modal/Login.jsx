import React from "react";
import { Modal } from "flowbite-react";
import mobile from "../../assets/mobile.svg";
import guitar from "../../assets/guita.png";
import love from "../../assets/love.png";
import avatar from "../../assets/avatar.png";
import close from "../../assets/close.svg";
import { Carousel } from "flowbite-react";
import { ModalBody } from "flowbite-react";
import google from "../../assets/google.png";
import { auth } from "../Firebase/Firebase";
import {signInWithPopup,GoogleAuthProvider} from 'firebase/auth'

const Login = ({ toggleModal, status }) => {
  const handleClick = async () => {
    const provider =new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(
        auth,
        provider
      );
      toggleModal();
      console.log(result.user,"------------------------");
      
    } catch (error) {
      console.log("error",error);
    }
  };

  return (
    <div>
      {/* <Modal
        theme={{
          content: {
            base: "relative w-full p-4 md:h-auto",
            inner:
              "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-grey-700 ",
          },
        }}
        onClick={toggleModal}
        show={status}
        className="bg-black rounded-none"
        position={"center"}
        size="md"
        popup={true}
      > */}
      <Modal
        show={status}
        onClick={toggleModal}
        size="md"
        popup={true}
        position="center"
        className="bg-black bg-opacity-50 flex items-center justify-center"
        theme={{
          content: {
            base: "relative w-[440px] max-w-xs mx-auto p-4 md:h-auto",
            inner:
              "relative flex flex-col rounded-lg bg-white shadow dark:bg-grey-700 ",
          },
        }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="p-6 pl-2 pr-2 bg-white"
        >
          <img
            className="w-6 absolute z-10 top-4 right-4 cursor-pointer"
            onClick={toggleModal}
            src={close}
            alt=""
          />
          



          <Carousel
            slide={false}
            theme={{
              indicators: {
                active: {
                  off: "bg-gray-300",
                  on: "bg-teal-300",
                },
                base: "h-2 w-2 rounded-full",
                wrapper:
                  "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3",
              },
              scrollContainer: {
                base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                snap: "snap-x",
              },
              control: {
                base: "inline-flex items-center justify-center bg-transparent",
                icon: "w-8 text-black dark:text-black",
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="w-full h-48 pb-5 rounded-none"
          >

            <div className="flex flex-col items-center justify-center">
              <img className="w-24 pb-5" src={guitar} alt="Car Image 1" />
              <p
                style={{ color: "#002f34" }}
                className=" w-60 sm:w-72 text-center pb-5 font-semibold"
              >
                Help us become one of the safest place to buy and sell.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-24 pb-5" src={love} alt="Car Image 2" />
              <p
                style={{ color: "#002f34" }}
                className=" w-60 sm:w-72 text-center pb-5 font-semibold"
              >
                Close deals from the comfort of your home.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="w-24 pb-5" src={avatar} alt="Car Image 3" />
              <p
                style={{ color: "#002f34" }}
                className=" w-60 sm:w-72 text-center pb-5 font-semibold"
              >
                Keep all your favorites in one place.
              </p>
            </div>
          </Carousel>
        </div>

        <ModalBody
          className="bg-white h-auto p-4 rounded-none "
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="p-6 pt-0">
            <div className="flex items-center justify-center rounded-md border-2 border-solid border-grey-300 p-5 relative h-8 cursor-pointer active:bg-teal-100" onClick={handleClick}>
              <img className="w-7 absolute left-2 " src={google} alt="" />
              <p className="text-sm text-grey-500">continue with google</p>
            </div>
            <div className="pt-5 flex flex-col items-center justify-center">
              <p className="font-se,ibold text-sm">or</p>
              <p className="font-bold text-sm pt-3 underline underline-offset-4">
                Login With Email
              </p>
            </div>
            <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
              <p className="text-xs">
                {" "}
                All your personal details are safe with us.
              </p>
              <p className="text-x5 pt-5 text-center">
                If you continue, you are accepting{" "}
                <span className="text-blue-600">
                  OLX Terms and Conditions and Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
