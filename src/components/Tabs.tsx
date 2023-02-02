import { Tab } from "@headlessui/react";
import { Fragment } from "react";

type TabsProps = {
  labels: string[];
  onChange: (s: string) => void;
  selected?: string | null;
};

export default function Tabs({ labels, onChange, selected }: TabsProps) {
  return (
    <Tab.Group
      onChange={(i) => onChange(labels[i])}
      selectedIndex={selected ? labels.indexOf(selected) : 0}
    >
      <Tab.List>
        {labels.map((s) => (
          <Tab key={s} as={Fragment}>
            {({ selected }) => (
              <button
                className={`border-2 p-2 ${
                  selected ? "bg-blue-200" : "bg-white"
                }`}
              >
                {s}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}
