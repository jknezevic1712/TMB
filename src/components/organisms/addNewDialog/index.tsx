import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";

// components
import {
  DialogWrapper,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  closeDialog,
} from "@/components/molecules/dialog";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

type FormInputs = {
  description: string;
};
type AddNewDialogProps = {
  name: string;
  title: string;
  description: string;
  submitAction: (description: string) => Promise<void>;
};
export default function AddNewDialog(props: AddNewDialogProps) {
  const { name, title, description, submitAction } = props;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) =>
    await submitAction(data.description);

  useEffect(() => {
    if (isSubmitSuccessful) {
      closeDialog();
      reset({ description: "" });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <DialogWrapper>
      <DialogTrigger asChild>
        <Button variant="default">{name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          id="dialogForm"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description&#42;
            </Label>
            <Input
              id="description"
              className="col-span-3"
              {...register("description", { required: true })}
            />
          </div>
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </form>
        <DialogFooter>
          <Button form="dialogForm" type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogWrapper>
  );
}
