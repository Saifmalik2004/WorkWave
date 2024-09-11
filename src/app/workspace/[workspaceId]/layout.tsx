'use client'
import Sidebar from "./component/sidebar";
import Toolbar from "./component/toolbar";

interface WorkspaceIdLayoutProps{
    children:React.ReactNode
}

 const WorkspaceIdLayout=({children}:WorkspaceIdLayoutProps)=> {
  return (
    <div className=" h-full">
      <Toolbar/>
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar/>
      { children}
      </div>
        
    </div>

  );
}
export default WorkspaceIdLayout
