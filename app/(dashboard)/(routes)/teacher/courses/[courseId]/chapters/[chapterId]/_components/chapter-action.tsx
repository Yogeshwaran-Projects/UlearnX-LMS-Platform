"use client"

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface ChapterActionsProps {
    disabled: boolean;
    courseId:string;
    chapterId: string;
    isPublished: boolean;
};


export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoding] = useState(false);


    const onDelete = async () => {
        try{
            setIsLoding(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

            toast.success("Chpter deleted");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
        }
        catch {
            toast.error("Something went wrong");
        }
        finally {
            setIsLoding(false);
        }
    }

    const onClick = async () => {
        try {
            setIsLoding(true);
    
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
            }
            router.refresh();
        } catch (error) {
            console.error("Error publishing chapter:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoding(false);
        }
    };
    return (
        <div className="flex items-center gap-x-2">
            <Toggle
            
            onClick={onClick}
            disabled={disabled || isLoading}
            variant="outline"
            size="sm"
            >
                {isPublished ? "Unpublish": "Publish"}
            </Toggle>
            <ConfirmModal onConfirm={onDelete}>
            <Toggle size="sm">
                <Trash className="h-4 w-4"/>
            </Toggle>
            </ConfirmModal>
        </div>
    )
}