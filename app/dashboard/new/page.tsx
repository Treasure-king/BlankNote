"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function NewBoardPage() {
  const router = useRouter();

  // ------------------------------
  // Form State
  // ------------------------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("active");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [color, setColor] = useState("#6366F1");
  const [icon, setIcon] = useState("📝");
  const [coverImage, setCoverImage] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState("VIEWER");

  const addTag = () => {
    if (!tagInput.trim()) return;
    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const addCollaborator = () => {
    if (!emailInput.trim()) return;
    setCollaborators((prev) => [...prev, { email: emailInput.trim(), role: roleInput }]);
    setEmailInput("");
  };

  // ------------------------------
  // Submit
  // ------------------------------
  const handleCreate = async () => {
    const res = await fetch("/api/board", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category,
        priority,
        status,
        tags,
        dueDate,
        color,
        icon,
        coverImage,
        collaborators,
        isPublic,
      }),
    });

    if (res.ok) router.push("/dashboard");
  };

  const colors = [
    "#EF4444", "#F97316", "#EAB308", "#22C55E",
    "#3B82F6", "#6366F1", "#A855F7", "#EC4899",
  ];

  const icons = ["📝", "📊", "⚙️", "🎨", "🧪", "🗂️", "📚", "📌"];
  

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">

        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Create New Project
        </h1>

        {/* Title */}
        <div className="mb-5">
          <Label className="mb-1 block dark:text-neutral-200">Project Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <Label className="mb-1 block dark:text-neutral-200">Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description..."
            className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-5">

          {/* Category */}
          <div className="mb-5">
            <Label className="mb-1 block dark:text-neutral-200">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["General", "Design", "Development", "Research", "Planning", "Marketing"]
                  .map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="mb-5">
            <Label className="mb-1 block dark:text-neutral-200">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Low", "Medium", "High", "Critical"].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="mb-5">
            <Label className="mb-1 block dark:text-neutral-200">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Label className="mb-1 block dark:text-neutral-200">Tags</Label>

          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
              className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
            <Button onClick={addTag} className="cursor-pointer">Add</Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setTags((prev) => prev.filter((t, idx) => idx !== i))
                  }
                  className="px-2 py-1 text-xs rounded bg-neutral-100 dark:bg-neutral-800 dark:text-white border dark:border-neutral-700 hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  {tag} ✕
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Due Date */}
        <div className="mb-5">
          <Label className="mb-1 block dark:text-neutral-200">Due Date</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
        </div>

        {/* Icons */}
        <div className="mb-6">
          <Label className="mb-1 block dark:text-neutral-200">Project Icon</Label>
          <div className="flex gap-3 flex-wrap">
            {icons.map((i) => (
              <button
                key={i}
                onClick={() => setIcon(i)}
                className={`text-2xl p-2 rounded-xl border dark:border-neutral-700
                  ${icon === i ? "bg-primary text-white" : "bg-neutral-100 dark:bg-neutral-800 dark:text-white"}
                `}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <Label className="mb-1 block dark:text-neutral-200">Project Color</Label>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ background: c }}
                className={`h-8 w-8 rounded-full border border-neutral-300 dark:border-neutral-600
                  ${color === c ? "ring-2 ring-black dark:ring-white" : ""}
                `}
              />
            ))}
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-6">
          <Label className="mb-1 block dark:text-neutral-200">Cover Image URL</Label>

          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Paste image URL here"
            className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />

          {/* Preview */}
          {coverImage && (
            <div className="mt-4 border rounded-lg overflow-hidden w-full h-40">
              <img
                src={coverImage}
                alt="Cover Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  toast.error("invalid Image URL")
                }}
              />
            </div>
          )}
        </div>


        {/* Public Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          <Label className="dark:text-neutral-200">Make Public</Label>
        </div>

        {/* Collaborators */}
        <div className="mt-6 mb-4">
          <Label className="font-medium block mb-2 dark:text-neutral-200">Collaborators</Label>

          <div className="flex gap-2 mb-3">
            <Input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email"
              className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />

            <Select value={roleInput} onValueChange={setRoleInput}>
              <SelectTrigger className="w-[120px] dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VIEWER">Viewer</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={addCollaborator}>Add</Button>
          </div>

          {collaborators.length > 0 && (
            <ul className="space-y-1 text-sm dark:text-neutral-300">
              {collaborators.map((c, i) => (
                <li key={i}>{c.email} — {c.role}</li>
              ))}
            </ul>
          )}
        </div>

        <Button
          onClick={handleCreate}
          disabled={!title}
          className="w-full mt-8 cursor-pointer"
        >
          Create Project
        </Button>

      </div>
    </div>
  );
}
