import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type FileInputProps = {
  id: string;
  onUpload: (e: ELM.Library) => void;
};

export default function FileInput({ id, onUpload }: FileInputProps) {
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async (f: File) => {
    return new Promise<{ library: ELM.Library }>((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;

      reader.onload = () => {
        if (!reader.result || typeof reader.result !== "string") {
          reject("Could not read input");
        } else {
          setFileName(f.name);
          resolve(JSON.parse(reader.result) as { library: ELM.Library });
        }
      };

      reader.readAsText(f);
    });
  };

  return (
    <div>
      <label htmlFor={id}>
        <div className="w-full items-center flex border-2 border-slate-300 p-2 rounded-lg cursor-pointer hover:bg-slate-200">
          <ArrowUpTrayIcon className="w-6 h-6 absolute" />

          <div className="pl-8 w-full">
            {fileName ? (
              <div className="font-bold text-sm truncate">{fileName}</div>
            ) : (
              <div className="italic font-extralight text-sm">
                Upload ELM JSON...
              </div>
            )}
          </div>
        </div>
      </label>
      <input
        id={id}
        type="file"
        accept=".json"
        max={1}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleUpload(e.target.files[0])
              .then((e) => {
                onUpload(e.library);
              })
              .catch((e) => {
                setFileName("");
                setErrorMessage(e.message);
              });
          }
        }}
      />
      {errorMessage !== "" && (
        <div className=" pt-2 w-full flex justify-center font-extralight animate-pulse">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
