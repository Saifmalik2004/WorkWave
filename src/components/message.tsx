import { format, isToday, isYesterday } from "date-fns";
import { Doc, Id } from "../../convex/_generated/dataModel"
import dynamic from "next/dynamic";
import Hint from "./hint";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Thumbnail } from "./thumbnail";


const Renderer=dynamic(()=> import("@/components/renderer"),{ssr:false})
interface MessageProps{
id:Id<"messages">;
memberId:Id<"members">
authorImage?:string;
authorName?:string
isAuthor:boolean
reactions:Array<
Omit<Doc<"reactions">,"memberId">&{
count:number;
memberIds:Id<"members">[];
}>
body:Doc<"messages">["body"];
image:string|undefined|null
updatedAt:Doc<"messages">["updatedAt"];
createdAt:Doc<"messages">["_creationTime"];
isEditing:boolean
setEditingId:(id:Id<"messages"> |null)=> void
isCompact:boolean
hideThreadButton?:boolean 
threadCount?:number
threadImage?:string
threadTimeStamp?:number;
}

const formatFullTime=(date:Date)=>{
    return `${isToday(date)? "Today":isYesterday(date)? "Yesterday": format(date,"MM d,yyyy")} at ${format(date,"h:mm:ss a")} `
}

function Message({
id,
memberId,
authorImage,
authorName="Member",
isAuthor,
reactions,
body,
image,
updatedAt,
createdAt,
isEditing,
setEditingId,
isCompact,
hideThreadButton,
threadCount,
threadImage,
threadTimeStamp,
}:MessageProps) {
  const  workspaceId=useWorkspaceId()
  const avatarFallback=authorName?.charAt(0).toUpperCase()

    if(isCompact){
        return (
            <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
                <div className="flex items-center gap-2">
                   <Hint label={formatFullTime(new Date(createdAt))}>
                   <button className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
                        {format(new Date(createdAt),"hh:mm")}
                    </button>
                   </Hint>
               
                    <div className="flex flex-col w-fulll">
                      <Renderer value={body}/>
                      <Thumbnail url={image}/>
                      {updatedAt ?(
                        <span className="text-xs text-muted-foreground">(edited)</span>
                      ):null}
                    </div>
                </div>
            </div>
          );
    }

    return (
        <div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
            <div className="flex items-start gap-2">
              <button>
              <Link href={`/workspace/${workspaceId}/member/${id}`}>
            <Avatar >
                <AvatarImage src={authorImage}/>
                <AvatarFallback >
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>

            </Link>
              </button>
              <div className="flex flex-col w-full overflow-hidden">
              <div className="text-sm">
                <button 
               onClick={()=>{}} className="font-bold text-primary hover:underline">
                    {authorName}
                </button>
                <span>&nbsp;&nbsp;</span>
                <Hint label={formatFullTime(new Date(createdAt))}>
                <button className="text-xs text-muted-foreground hover:underline">
                    {format(new Date(createdAt),"h:mm a")}
                </button>
                </Hint>
              </div>
              <Renderer value={body}/>
              <Thumbnail url={image}/>
              {updatedAt? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ):null}
              </div>
            </div>
           
        </div>
      );
  
}

export default Message