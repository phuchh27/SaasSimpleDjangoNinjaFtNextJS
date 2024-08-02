import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDemo({
  title,
  description,
  error
}: Readonly<{ title: string; description: string; error: boolean }>) {
  return (
    <div className="">
      {!error ? (
        <Alert>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
