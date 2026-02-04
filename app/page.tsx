import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { Checkbox } from "@heroui/checkbox";


export default function Home() {
  const title = "This is an alert";
  const description = "Thanks for subscribing to our newsletter!";
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-wrap gap-4 items-center">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
    </div>
    <div className="flex items-center justify-center w-full">
      <Alert color="success" description={description} title={title} />
    </div>
    <div className="flex gap-4">
      <Checkbox defaultSelected color="default">
        Default
      </Checkbox>
      <Checkbox defaultSelected color="primary">
        Primary
      </Checkbox>
      <Checkbox defaultSelected color="secondary">
        Secondary
      </Checkbox>
      <Checkbox defaultSelected color="success">
        Success
      </Checkbox>
      <Checkbox defaultSelected color="warning">
        Warning
      </Checkbox>
      <Checkbox defaultSelected color="danger">
        Danger
      </Checkbox>
    </div>
    </section>
  );
}
