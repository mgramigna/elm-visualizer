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
    let statement: ELM.ExpressionDef | ELM.FunctionDef | undefined;

    if (selectedStatement) {
      statement = elm?.statements?.def?.find(
        (s) => s.name === selectedStatement
      );
    } else if (tabContent.length === 1) {
      statement = elm?.statements?.def?.find((s) => s.name === tabContent[0]);
    }

    return statement ? <Tree rootStatement={statement} /> : "";
  };

  const renderTabs = () => {
    if (!elm || tabContent.length === 1) {
      return "";
    }

    return (
      <>
        <div className="text-center pb-8 font-bold text-xl">
          Select Statement:
        </div>
        <div>
          <Tabs
            labels={tabContent}
            onChange={setSelectedStatement}
            selected={selectedStatement}
          />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-72 py-8">
        <FileInput id="elm-file-input" onUpload={processElm} />
      </div>
      <div className="w-full">{renderTabs()}</div>
      {renderSelectedStatement()}
    </div>
  );
}

export default App;
