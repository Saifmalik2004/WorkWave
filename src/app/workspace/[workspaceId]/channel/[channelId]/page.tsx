'use client'

import { useGetChannel } from "@/features/channels/api/use-get-channel"
import { useChannelId } from "@/hooks/use-channel-id"
import { Loader, TriangleAlert } from "lucide-react"
import Header from "./component/header"
import ChatInput from "./component/chat-input"

const ChannelIdPage=()=> {
  const channelId=useChannelId()
  const {data:channel,isLoading:channelLoading}=useGetChannel({id:channelId});
  
  if(channelLoading){
    return(
      <div className="h-full  flex-1 flex items-center justify-center  gap-2">
        <Loader className="s-ze6 animate-spin text-muted-foreground"/>
      </div>
    )
  }

  if(!channel|| Array.isArray(channel)){
    return(
      <div className="h-full  flex-1 flex items-center justify-center flex-col gap-y-2">
        <TriangleAlert className="size-5  text-muted-foreground"/>
        <span className="text-sm text-muted-foreground">
          Channel not found
        </span>
      </div>
    )
  }
  return (
    <div className=' h-full flex flex-col '>
     <Header name={channel.name}/>
     <div className="flex-1"/>
     <ChatInput/>
     
      </div>
  )
}

export default ChannelIdPage