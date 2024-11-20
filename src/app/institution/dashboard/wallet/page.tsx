"use client";
import Container from "../components/Container";
// plus icon for mui
import { Add } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function Wallet() {
    return (
        <Container>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Wallet</h1>

                <div className="flex items-center gap-2">
                    <Tooltip title="Add">
                        <IconButton>
                            <Add fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </Container>
    )
}