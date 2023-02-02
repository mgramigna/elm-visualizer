import { Tab } from "@headlessui/react";

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
      <Tab.List className="flex space-x-4 flex-wrap">
        {labels.map((s, i) => {
          const key = `${s}-${i}`;
          return (
            <Tab key={key} as="div" className="py-2 focus-visible:outline-none">
              {({ selected }) => (
                <button
                  className={`${
                    selected ? "bg-blue-200" : "bg-white"
                  } rounded-full border-2 p-2`}
                >
                  {s}
                </button>
              )}
            </Tab>
          );
        })}
      </Tab.List>
    </Tab.Group>
  );
}
