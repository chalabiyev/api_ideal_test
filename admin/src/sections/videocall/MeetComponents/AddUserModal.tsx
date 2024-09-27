import { useStore } from "src/store/store";
import { useEffect, useState } from "react";
import cross from "../../../../public/cross.png";
import copy from "../../../../public/copy.png";

const AddUserModal = () => {
  const { AddUserModal1, setAddUserModal1 } = useStore(state => ({
    AddUserModal1: state.AddUserModal1,
    setAddUserModal1: state.setAddUserModal1,
  }));

  const [copied, setCopied] = useState(false);
  const [link1, setLink1] = useState("");

  useEffect(() => {
    setLink1(window.location.href);
  }, []);

  function handleCopy(link: string) {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <div
    role="presentation" 
      onClick={() => setAddUserModal1(false)}
      className={`${
        AddUserModal1 ? "opacity-100 cursor-pointer  z-[1]" : "opacity-0  z-[-1]"
      } bg-[#2e2e2e96] absolute text-white backdrop-blur-sm  w-screen  h-svh left-0 top-0 flex items-center justify-center`}
    >
      <div
          role="presentation" 

        onClick={e => e.stopPropagation()}
        className="w-[570px] cursor-auto relative flex flex-col justify-between p-[25px] text-black duration-100 h-[141px] bg-[#F7F7F7] rounded-[30px]"
      >
        <img
          src={cross}
          role="presentation"
          alt="cross img"
          className="w-[17px] cursor-pointer absolute h-[17px] top-5 right-[25px]"
          onClick={() => setAddUserModal1(false)}
        />
        <h1 className="font-medium text-[#3C3C3C]">Paylaşma link</h1>
        <div
            role="presentation" 

          onClick={() => handleCopy(link1)}
          className="w-full relative cursor-pointer p-[20px] h-[40px] bg-[#D9D9D9] flex items-center justify-between rounded-[10px]"
        >
          <div
            className={`${
              copied
                ? "opacity-100 -translate-y-32"
                : "opacity-0 -translate-y-24"
            } absolute w-[150px] flex items-center duration-500 text-center rounded-md justify-center h-[25px] bg-[#D9D9D9] left-1/2  -translate-x-1/2`}
          >
            Link kopyalandı!
          </div>
          <span>{link1}</span>
          <img src={copy} className="w-[20px] h-[20px]" alt="copy img" />
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
