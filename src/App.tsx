import { useState } from "react";
import FileInput from "./components/FileInput";
import Tabs from "./components/Tabs";
import Tree from "./components/Tree";

function App() {
  const [elm, setElm] = useState<ELM.Library | null>(null);
  const [tabContent, setTabContent] = useState<string[]>([]);
  const [selectedStatement, setSelectedStatement] = useState<string | null>(
    null
  );

  const processElm = (e: ELM.Library) => {
    setElm(e);
    setTabContent(
      e.statements?.def
        ?.filter((d) => d.name !== "Patient")
        .map((d, i) => d.name ?? `Statement ${i + 1}`) ?? []
    );
  };

  const renderSelectedStatement = () => {
    const statment = elm?.statements?.def?.find(
      (s) => s.name === selectedStatement
    );

    return statment ? <Tree rootStatement={statment} /> : "";
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <Tabs
          labels={tabContent}
          onChange={setSelectedStatement}
          selected={selectedStatement}
        />
        <FileInput id="elm-file-input" onUpload={processElm} />
        {selectedStatement && renderSelectedStatement()}
      </div>
    </div>
  );
}

export default App;
