import { Toast } from "flowbite-react";
import { useEffect, useRef } from "react";

import { HiCheck, HiX } from "react-icons/hi";

function useToast() {
  const RefToast = useRef<any>(null);

  useEffect(() => {
    console.log(RefToast.current);
  }, []);

  const successToast = (text: string) => {
    return (
      <Toast ref={RefToast}>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{text}</div>
        <Toast.Toggle />
      </Toast>
    );
  };

  const errorToast = (text: string) => {
    return (
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{text}</div>
        <Toast.Toggle />
      </Toast>
    );
  };

  return {
    successToast,
    errorToast,
  };
}

export default useToast;
