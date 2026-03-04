import Link from "next/link";
import { Button } from "../primitives/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../primitives/card";

/**
 * @param {{
 *   href?: string
 * }} props
 * @returns {React.JSX.Element}
 */
export default function NotFoundContent({ href = "/" }) {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">404</CardTitle>
        <CardDescription>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button asChild>
          <Link href={href}>Go home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
