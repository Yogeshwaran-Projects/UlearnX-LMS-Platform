"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Shuffle, ShuffleIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Toggle
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Title
          <ShuffleIcon className="ml-2 h-4 w-4" />
        </Toggle>
      );
    },
  },
  {
    accessorKey : "price",
    header: ({ column }) => {
      return (
        <Toggle
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Price
          <ShuffleIcon className="ml-2 h-4 w-4" />
        </Toggle>
      );
    },
    cell: ({ row }) => {
        const price = parseFloat(row.getValue("price") || "0");
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR"
        }).format(price);
        return <div>{formatted}</div>;
      }
      
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Toggle
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Published
          <ShuffleIcon className="ml-2 h-4 w-4" />
        </Toggle>
      );
    },
    cell: ({ row }) => {
        const isPublished = row.getValue("isPublished") || false;

        return (
            <Badge >
                {isPublished ? "Published" : "Draft"}
            </Badge>
        )
      }
  },
  {
    id: "actions",
    cell: ({row}) => {
      const {id} = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Toggle 
             className= "h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4"/>
            </Toggle>
          </DropdownMenuTrigger>
          <DropdownMenuContent align = "end">
            <Link href={`/teacher/courses/${id}`}>
            <DropdownMenuItem>
              <Pencil className="h-4 w-4 mr-2"/>
              Edit
              </DropdownMenuItem>
              </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
];