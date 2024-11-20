"use client";
import Container from "../components/Container";
import RefaralTracking from "./components/RefaralTracking";
import Learn from "./components/Learn";
import FileOverview from "./components/FileOverview";
// import components
import UserCard from "./components/UserCard";

export default function Dashboard() {

    return (
        <Container>
            <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-400">Welcome to DCN Dashboard</h3>
            </div>

            <div className="mt-5 flex justify-between items-center h-[100%] min-w-[95%]">
                {/* first col */}
                <div className="w-3/4 flex flex-col p-4 min-h-[100%]">

                    <div className="flex justify-between w-[100%] gap-4">
                        {/* profile card */}
                        <UserCard /> 

                        {/* Refaral Tracking */}
                        <RefaralTracking />
                    </div>

                    {/* File Overview */}
                    <div className="mt-5 w-[100%]">  
                        <FileOverview />
                    </ div>
                </div>

                {/* second col */}
                <div className="w-1/4 flex flex-col p-4 min-h-[100%]">
                    <Learn />
                </div>

            </div>

        </Container>
    )
}