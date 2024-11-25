import { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import cross from '../../../../public/cross.png';
import addicon from '../../../../public/addicon.png';
import icon2 from '../../../../public/attachment.png';
import supportPic from '../../../../public/circle.png';
import sendicon from '../../../../public/SendIcon.png';
import customerPic from '../../../../public/customer.png';
import crosscircleicon from '../../../../public/crosscircle.png';

type UploadedFile = {
  name: string;
  size: string;
};

const MeetChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 3,
      text: 'Sizə necə kömək edə bilərəm?',
      user: 'support',
      time: '12:47',
    },
    { id: 2, text: 'Salam, Anar bəy.', user: 'support', time: '12:46' },
    { id: 1, text: 'Salam ', user: 'customer', time: '12:45' },
  ]);

  const [message1, setMessage1] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items: DataTransferItem[] = Array.from(event.clipboardData?.items || []);
      items.forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setUploadedFiles((prevFiles) => [
                ...prevFiles,
                {
                  name: file.name,
                  size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                },
              ]);
            };
            reader.readAsDataURL(file);
          }
        }
      });
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  const sendMessage = () => {
    if (message1.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: message1,
        user: 'customer',
        time: new Date().toLocaleTimeString().slice(0, 5),
      };
      setMessages([newMessage, ...messages]);
      setMessage1('');
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleAttachmentClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const sendFiles = () => {
    const newMessages = uploadedFiles.map((file) => ({
      id: messages.length + 1 + messages.findIndex((message) => message.id),
      type: 'file',
      text: `${file.name}`,
      user: 'customer',
      time: new Date().toLocaleTimeString().slice(0, 5),
    }));

    setMessages([...newMessages, ...messages]);
    setUploadedFiles([]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const closeModal = () => {
    setUploadedFiles([]);
  };

  return (
    <Box
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
      onDragLeave={(event) => {
        event.preventDefault();
      }}
      className="overflow-hidden rounded-l-[30px] p-[24px] h-full w-[30%]"
    >
      <Box
        className="w-full duration-500 flex relative items-start flex-col overflow-hidden justify-between h-full text-white rounded-[20px] p-[17px] !pt-[12px] bg-[#7E7F7F]"
        onDrop={handleFileDrop}
      >
        {uploadedFiles.length > 0 && (
          <div className="absolute w-full h-full flex items-center justify-center backdrop-blur-md bg-[#2e2e2e6c] top-0 left-0 z-[1]">
            <div className="w-[70%] bg-white rounded-[28.24px] min-h-[5rem] p-4 flex flex-col justify-between">
              <ul className="flex flex-col gap-2 pt-4 pb-9 relative">
                <img
                  src={cross}
                  alt="cross icon"
                  onClick={closeModal}
                  role="presentation"
                  className="absolute right-0 top-0 w-3 h-3 cursor-pointer"
                />
                <img
                  alt="send icon"
                  onClick={sendFiles}
                  src={sendicon}
                  role="presentation"
                  className="absolute right-0 bottom-[5px] w-3 h-3 cursor-pointer"
                />

                <div
                  role="presentation"
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="flex items gap-2 items-center justify-center absolute left-0 bottom-0 cursor-pointer"
                >
                  <img src={addicon} alt="add icon" className="w-4 h-4 cursor-pointer" />
                  <span className="text-[#717171] font-medium text-[14px]">Əlavə et</span>
                </div>
                {uploadedFiles.map((file, index) => (
                  <li
                    className="text-black pl-6 flex flex-col text-start text-[12px] relative"
                    key={index}
                  >
                    <img
                      role="presentation"
                      src={crosscircleicon}
                      alt="delete icon"
                      onClick={() => removeFile(index)}
                      className="w-3 h-3 absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    />
                    <div>{file.name}</div>
                    <div className="text-[10px] text-[#3C3C3C]">{file.size}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div className="absolute z-[1] border-b border-b-[#3C3C3C] bg-[#7e7f7f] font-medium w-full left-0 top-0 h-[40px] flex items-center justify-center">
          Ədliyyə Nazirliyi
        </div>
        <div className="h-full pt-8 opacity-100 w-full text-sm flex flex-col-reverse no-scrollbar overflow-y-scroll duration-300">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user === 'customer' ? 'justify-end' : 'justify-start'
              } my-1 drop-shadow-sm`}
            >
              <div
                className={`w-full flex ${
                  message.user === 'customer' ? 'flex-row-reverse' : 'flex-row'
                } gap-[5px]`}
              >
                <img
                  src={message.user === 'customer' ? customerPic : supportPic}
                  alt="avatar"
                  className="w-8 h-8 rounded-full drop-shadow-lg"
                />
                <div
                  className={`${
                    message.user === 'customer'
                      ? 'rounded-br-none bg-white text-[#333232]'
                      : 'rounded-bl-none bg-[#A9A9A9] text-black'
                  } flex items-end justify-between rounded-lg text-start px-3 py-1 border border-[#333232] relative`}
                >
                  <div className="pr-7">{message.text}</div>
                  <div
                    className={`${
                      message.user === 'customer' ? 'text-[#a8a8a8]' : 'text-[#565656]'
                    } text-[10px] absolute bottom-0 right-2`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-[30px] opacity-100 w-full rounded-[9px] mt-2 duration-500 items-center justify-between flex border border-[#333232] bg-[#F7F7F7]">
          <input
            value={message1}
            onChange={(e) => setMessage1(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Müraciətinizi daxil edin"
            type="text"
            className="rounded-[9px] placeholder:italic bg-transparent placeholder:font-thin placeholder:text-sm pl-2 h-full w-[82%] outline-none text-black"
          />
          <img
            src={icon2}
            alt="attachment icon"
            className="cursor-pointer mr-1 w-[11px]"
            onClick={handleAttachmentClick}
            role="presentation"
          />
          <img
            onClick={sendMessage}
            role="presentation"
            src={sendicon}
            alt="send icon"
            className="cursor-pointer mr-2 w-4"
          />
        </div>
      </Box>
    </Box>
  );
};

export default MeetChat;
