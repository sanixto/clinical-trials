interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  className?: string;
  errorMessage?: string;
}

export function Input({
  label,
  id,
  className,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div
      className={`w-full flex gap-3 xl:gap-5 text-xl xl:text-3xl flex-col ${className}`}
    >
      {label && (
        <label className="w-full text-gray-600 font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className="border-2 p-3 xl:p-4 rounded-xl border-gray-300 text-gray-500 w-full"
        type="text"
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500 font-medium text-xl">{errorMessage}</p>
      )}
    </div>
  );
}
