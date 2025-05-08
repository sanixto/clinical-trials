interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;
}

export function Radio({ label, id, className, ...props }: RadioProps) {
  return (
    <div className={`flex gap-5 text-3xl flex-row ${className}`}>
      <input
        id={id}
        className="border-2 p-4 rounded-xl border-gray-300 text-gray-500 w-8"
        type="radio"
        value={"true"}
        {...props}
      />
      {label && (
        <label className="w-full text-gray-600" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
