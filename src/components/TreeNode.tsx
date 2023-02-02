type TreeNodeProps = {
  label: string;
};

export default function TreeNode({ label }: TreeNodeProps) {
  return (
    <div className="w-64 h-64 rounded-full bg-slate-300 flex justify-center items-center text-center">
      {label}
    </div>
  );
}
