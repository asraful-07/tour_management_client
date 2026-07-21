"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DeleteConfirmation } from "@/components/Modules/Admin/DeleteConfirmation";
import { AddDivisionModal } from "@/components/Modules/Admin/Division/AddDivisionModa";
import { EditDivisionModal } from "@/components/Modules/Admin/Division/EditDivisionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteDivisionMutation,
  useGetDivisionsQuery,
} from "@/redux/features/division/division.api";
import { MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";

// ─── Skeleton Rows ──────────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-3 w-48" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

// ─── Division Table Page ────────────────────────────────────────────────────

export default function DivisionManagement() {
  const {
    data: divisions,
    isLoading,
    isError,
  } = useGetDivisionsQuery(undefined);

  const [deleteDivision] = useDeleteDivisionMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteDivision(id).unwrap();
      toast.success("Division deleted successfully");
    } catch (err) {
      toast.error("Failed to delete division");
      console.error(err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Divisions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all geographic divisions in the system.
          </p>
        </div>
        <AddDivisionModal />
      </div>

      {/* Stats Strip */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>
          {isLoading
            ? "Loading…"
            : `${divisions?.length ?? 0} division${divisions?.length === 1 ? "" : "s"} total`}
        </span>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-border/60 overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[260px] font-medium text-foreground">
                Division
              </TableHead>
              <TableHead className="font-medium text-foreground">
                Description
              </TableHead>
              <TableHead className="font-medium text-foreground">
                Status
              </TableHead>
              <TableHead className="text-right font-medium text-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading */}
            {isLoading && <TableSkeleton />}

            {/* Error */}
            {isError && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-3xl">⚠️</span>
                    <p className="text-sm font-medium text-foreground">
                      Failed to load divisions
                    </p>
                    <p className="text-xs">Please refresh the page.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!isLoading && !isError && divisions?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <MapPin className="w-8 h-8 opacity-30" />
                    <p className="text-sm font-medium text-foreground">
                      No divisions yet
                    </p>
                    <p className="text-xs">
                      Add your first division to get started.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Data Rows */}
            {!isLoading &&
              divisions?.map((division: any) => (
                <TableRow
                  key={division._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {/* Name + Image */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {division.thumbnail ? (
                        <img
                          src={division.thumbnail}
                          alt={division.name}
                          className="w-10 h-10 rounded-lg object-cover border border-border/50 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/40">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm leading-tight">
                          {division.name}
                        </p>
                        {division.slug && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            /{division.slug}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Description */}
                  <TableCell className="text-sm text-muted-foreground max-w-[280px]">
                    <p className="truncate">
                      {division.description || (
                        <span className="italic opacity-50">
                          No description
                        </span>
                      )}
                    </p>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-medium dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                    >
                      Active
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Edit */}
                      <EditDivisionModal division={division} />

                      {/* Delete */}
                      <DeleteConfirmation
                        onConfirm={() => handleDelete(division._id)}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/40 transition-colors"
                          title="Delete division"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </DeleteConfirmation>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
