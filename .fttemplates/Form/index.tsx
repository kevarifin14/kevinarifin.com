import { useForm } from "react-hook-form";

import { Button } from "components/Button";

import { classNames } from "lib/tailwind";

type <FTName>Props = {
  className?: string;
};

type <FTName>Fields = {

};

export function <FTName>({ className }: <FTName>Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<<FTName>Fields>();

  const <FTName | camelcase>ClassName = classNames(
    className,
  );

  const handleFormSubmit = async ({  }: <FTName>Fields) => {

  }

  return (
    <form className={<FTName | camelcase>ClassName} onSubmit={handleSubmit(handleFormSubmit)}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}