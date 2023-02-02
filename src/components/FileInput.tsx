import { useState } from "react";
import Spinner from "./Spinner";

type FileInputProps = {
  id: string;
  onUpload: (e: ELM.Library) => void;
};

export default function FileInput({ id, onUpload }: FileInputProps) {
  const [isUploadLoading, setIsUplaodLoading] = useState(false);
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
        {isUploadLoading ? (
          <div className="w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full border-2 border-slate-300 p-4 rounded-lg">
            {fileName || "Upload File"}
          </div>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept=".json"
        max={1}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            setIsUplaodLoading(true);
            handleUpload(e.target.files[0])
              .then((e) => {
                onUpload(e.library);
                setIsUplaodLoading(false);
              })
              .catch((e) => {
                setIsUplaodLoading(false);
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
