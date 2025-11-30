"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function EditBoardPage() {
  const router = useRouter();
  const { boardId }: any = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // --------------------------------------------
  // Form State
  // --------------------------------------------
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
  // const [collaborators, setCollabInput] = useState("");

  const colors = [
    "#EF4444", "#F97316", "#EAB308", "#22C55E",
    "#3B82F6", "#6366F1", "#A855F7", "#EC4899",
  ];

  const icons = ["📝", "📊", "⚙️", "🎨", "🧪", "🗂️", "📚", "📌"];

  // --------------------------------------------
  // Fetch Existing Board
  // --------------------------------------------
  useEffect(() => {
    if (!boardId) return;

    fetch(`/api/board/${boardId}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load project");
        return data;
      })
      .then((board) => {
        setTitle(board.title);
        setDescription(board.description ?? "");
        setCategory(board.category ?? "General");
        setPriority(board.priority ?? "Medium");
        setStatus(board.status ?? "active");
        setTags(board.tags ?? []);
        setDueDate(board.dueDate ? board.dueDate.split("T")[0] : "");
        setColor(board.color ?? "#6366F1");
        setIcon(board.icon ?? "📝");
        setCoverImage(board.coverImage ?? "");
        setIsPublic(board.isPublic ?? false);
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setLoading(false));
  }, [boardId]);

  // --------------------------------------------
  // Add Tag
  // --------------------------------------------
  const addTag = () => {
    if (!tagInput.trim()) return;
    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  // --------------------------------------------
  // Save Changes
  // --------------------------------------------
  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);

    const res = await fetch(`/api/board/${boardId}`, {
      method: "PUT",
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
        isPublic,
      }),
    });

    setSaving(false);

    if (!res.ok) return alert("Failed to update project.");

    router.push(`/dashboard/${boardId}`);
  };

  // --------------------------------------------
  // Loading / Error UI
  // --------------------------------------------
  if (loading) {
    return (
      <p className="p-10 text-muted-foreground dark:text-neutral-400">
        Loading project...
      </p>
    );
  }

  if (errorMsg) {
    return <p className="p-10 text-red-500">{errorMsg}</p>;
  }

  // --------------------------------------------
  // EDIT PROJECT FORM
  // --------------------------------------------
  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl shadow-xl p-8 border border-neutral-200 dark:border-neutral-700">

        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
          Edit Project
        </h1>

        {/* Title */}
        <div className="mb-5">
          <Label className="mb-1 block dark:text-neutral-200">Project Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
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

        {/* Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-5">

        <div>
          <Label className="mb-1 block dark:text-neutral-200">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["General", "Design", "Development", "Research", "Marketing", "Planning"]
                .map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div>
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
        <div>
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
        {/* Tags */}
        <div className="mb-6">
          <Label className="mb-1 block dark:text-neutral-200">Tags</Label>

          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
              className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            />
            <Button onClick={addTag}>Add</Button>
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

        {/* Icon */}
        <div className="mb-6">
          <Label className="mb-2 block dark:text-neutral-200">Project Icon</Label>
          <div className="flex flex-wrap gap-3">
            {icons.map((i) => (
              <button
                key={i}
                onClick={() => setIcon(i)}
                className={`text-2xl p-2 rounded-xl border dark:border-neutral-700
                  ${icon === i
                    ? "bg-primary text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 dark:text-white"
                  }
                `}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="mb-6">
          <Label className="mb-2 block dark:text-neutral-200">Project Color</Label>
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
        <div className="mb-5">
          <Label className="mb-1 block dark:text-neutral-200">Cover Image URL</Label>
          <Input
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          />
        </div>

        {coverImage && (
          <img
            src={coverImage}
            alt="Cover Preview"
            className="w-full h-40 object-cover rounded-lg mb-6"
          />
        )}

        {/* Public Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
          <Label className="dark:text-neutral-200">Make Project Public</Label>
        </div>

        

        {/* Save Button */}
        <Button
          className="w-full mt-6"
          disabled={!title || saving}
          onClick={handleSave}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>

      </div>
    </div>
  );
}
