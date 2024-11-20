"use client"

// cert icon from mui
import { Assignment } from "@mui/icons-material";
import FileList from "./filelist";

export default function FileOverview() {
    return (
        <div className="bg-gradient-to-r from-[#12132D] to-[#0A0B1E] p-4 rounded-2xl w-[100%] min-h-[450px]">
            <div className="flex gap-5 items-center">
                <Assignment />
                <h3 className="text-lg font-bold text-gray-300">Certificate Collection</h3>
            </div>

            <div className="mt-5 w-[100%]">
                <FileList />
            </div>
        </div>
    )
}
