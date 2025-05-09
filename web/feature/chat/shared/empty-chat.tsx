import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/feature/shared/ui/card";
/**
 * EmptyChat component displayed when there are no messages in the chat. Shows a friendly prompt with a greeting emoji inside a styled card.*/
 
export const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gradient-to-r from-rose-500 to-pink-600">
      <Card className="w-fit h-fit p-2 border  rounded-lg shadow-md max-w-sm">
        <CardHeader>
          <CardTitle>No messages here yet...</CardTitle>
          <CardDescription>
            Send a message or tap the greeting below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl animate-bounce">👋</p>
        </CardContent>
      </Card>
    </div>
  );
};
