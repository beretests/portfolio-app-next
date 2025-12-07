"use client";

import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type CarouselKey = "choral" | "plants" | "roadTrips";

export default function AboutUploader() {
  const [selectedCarousel, setSelectedCarousel] =
    useState<CarouselKey>("choral");
  const [status, setStatus] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info"
  >("info");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setStatus("Uploading image(s)...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));
    formData.append("carousel", selectedCarousel);

    const res = await fetch("/api/about/admin/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus(json.error || "Upload failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setUploading(false);
      return;
    }

    setStatus("Image(s) uploaded");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    if (e.target) {
      e.target.value = "";
    }
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <label className="text-sm text-foreground font-semibold">
          Choose carousel
        </label>
        <select
          className="border rounded px-2 py-1 text-sm bg-background text-foreground"
          value={selectedCarousel}
          onChange={(e) => setSelectedCarousel(e.target.value as CarouselKey)}
          disabled={uploading}
        >
          <option value="choral">Choral Singing</option>
          <option value="plants">Indoor Plants</option>
          <option value="roadTrips">Road Trips</option>
        </select>
      </div>

      <div className="flex flex-col items-start gap-2">
        <label className="text-sm text-foreground font-semibold">
          Upload image to selected carousel
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          name="file"
          onChange={handleUpload}
          disabled={uploading}
          className="text-sm"
        />
      </div>

      {status && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MuiAlert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {status}
          </MuiAlert>
        </Snackbar>
      )}
    </div>
  );
}
