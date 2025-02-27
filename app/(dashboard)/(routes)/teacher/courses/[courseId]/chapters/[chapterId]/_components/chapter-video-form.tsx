"use client";

import * as z from "zod";
import Muxplayer from "@mux/mux-player-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Film, ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-uplode";
import { url } from "inspector";

interface ChapterVideoFormProps {
    initialData: Chapter & { muxData? : MuxData | null};
    courseId: string;
    chapterId: string;
};

const formSchema = z.object({
       videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            videoUrl:initialData?.videoUrl || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                      {!isEditing && !initialData.videoUrl && (
                        <>
                        <PlusCircle className = "h-4 w-4 mr-2" />
                        Add a video

                        </>
                      )  
                    } 
                    {!isEditing && initialData.videoUrl &&(
                        <>
                    
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl? (
                    <div className = "flex items-center justify-center h-60 bg-slate-200 rounded-md"> 
                    <Film className="h-10 w-10 text-slate-500" />
                    </div>
                ): (
                    <div className="relative aspect-video mt-2">
                            <Muxplayer 
                            playbackId={initialData?.muxData?.playbackId || " "}
                            
                            />
                    </div>
                )
                
            )}
            {isEditing && (
                <div>

                <FileUpload  
                endpoint="chapterVideo"
                onChange={(url) => {
                    if(url){
                        onSubmit({ videoUrl: url});
                    }
                }}
                />
                <div className="text-xs text-muted-foreground mt-4">
                    Upload this chapter&apos;s video
                    </div>

                    </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a few minutes to process.. Refresh the page if video does not appear.
                    </div>
            )}
        </div>
    )
}