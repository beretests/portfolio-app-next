"use client";
import Card from "../components/Card";
import { useEffect, useMemo, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Logo1 from "../images/portfolio-logo-cream.png";
import Logo2 from "../images/portfolio-logo-grey.png";
import Logo3 from "../images/portfolio-logo-darkblue.png";

type CarouselKey = "choral" | "plants" | "roadTrips";

interface ImagesByCarousel {
  choral: string[];
  plants: string[];
  roadTrips: string[];
}

const About: React.FC = () => {
  const [imagesByCarousel, setImagesByCarousel] = useState<ImagesByCarousel>({
    choral: [Logo1.src, Logo2.src, Logo3.src],
    plants: [Logo1.src, Logo2.src, Logo3.src],
    roadTrips: [Logo1.src, Logo2.src, Logo3.src],
  });
  const [status, setStatus] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("info");
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedCarousel, setSelectedCarousel] =
    useState<CarouselKey>("choral");

  // ✅ Check admin via /api/me
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          setIsAdmin(false);
          return;
        }
        const data = await res.json();
        setIsAdmin(!!data.isAdmin);
      } catch (err) {
        console.error("Failed to check admin", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  // Optional: load existing images from the server
  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetch("/api/about/images");
        if (!res.ok) return;
        const json = await res.json();

        setImagesByCarousel((prev) => ({
          choral: json.choral?.map((img: any) => img.url) ?? prev.choral,
          plants: json.plants?.map((img: any) => img.url) ?? prev.plants,
          roadTrips:
            json.roadTrips?.map((img: any) => img.url) ?? prev.roadTrips,
        }));
      } catch (err) {
        console.error("Failed to load about images", err);
      }
    };
    loadImages();
  }, []);

  const cardData = useMemo(
    () => [
      {
        id: "choral" as CarouselKey,
        title: "Choral Singing",
        body: "You'll find me most Sundays singing in my church choir and often with the University concert choir in my city.",
        images: imagesByCarousel.choral,
      },
      {
        id: "plants" as CarouselKey,
        title: "Indoor Plants",
        body: "I'm no green thumb but I'm proud of the plants I've managed to keep alive. I will never give up :)",
        images: imagesByCarousel.plants,
      },
      {
        id: "roadTrips" as CarouselKey,
        title: "Road Trips",
        body: "I love watching the changing landscape and notable landmarks as we move from one place to another",
        images: imagesByCarousel.roadTrips,
      },
    ],
    [imagesByCarousel]
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setStatus("Uploading image(s)...");
    setSnackbarSeverity("info");
    setSnackbarOpen(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));
    formData.append("carousel", selectedCarousel); // ✅ tell backend which carousel

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

    const uploads: { publicUrl: string }[] = json.uploads || [];
    setStatus("Image(s) uploaded");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);

    // ✅ Prepend into the selected carousel
    const newUrls = uploads.map((u) => u.publicUrl).filter(Boolean);
    setImagesByCarousel((prev) => ({
      ...prev,
      [selectedCarousel]: [...newUrls, ...prev[selectedCarousel]],
    }));

    // Clear the file input
    if (e.target) {
      e.target.value = "";
    }

    setUploading(false);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <h1 className="text-3xl font-bold text-center text-primary mb-4 mt-16 font-[family-name:var(--font-headings)]">
        About Me
      </h1>
      <p className="md:text-lg max-w-2xl text-justify font-[family-name:var(--font-body)]">
        I'm a software engineer with an eclectic experience in software
        development, software testing, system administration and technical
        support. I'm highly adaptable - whether it's switching from software
        testing to software engineering and back, learning new technologies like
        TypeScript and Supabase on the fly, or applying my problem-solving
        skills across various roles and industries, I consistently show
        resilience and a capacity to pivot quickly. I also have a keen interest
        in the infrastructure side of things, as I've solved problems with
        deploying applications with Nginx, Docker, Heroku and Cloudflare.
      </p>
      <p className="md:text-lg max-w-2xl text-justify mt-4 font-[family-name:var(--font-body)]">
        My blend of support experience, QA testing, and full-stack development
        uniquely positions me as a bridge between technical teams. I have the
        potential to excel in roles that require cross-functional collaboration,
        from development to infrastructure management and testing.
      </p>

      <div className="w-full mt-8 p-8">
        <h2 className="text-2xl font-semibold text-center font-[family-name:var(--font-headings)] text-primary">
          Personal Interests
        </h2>

        {/* ✅ Admin-only upload controls with carousel selector */}
        {isAdmin && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <label className="text-sm text-foreground font-semibold">
                Choose carousel
              </label>
              <select
                className="border rounded px-2 py-1 text-sm bg-background text-foreground"
                value={selectedCarousel}
                onChange={(e) =>
                  setSelectedCarousel(e.target.value as CarouselKey)
                }
                disabled={uploading}
              >
                <option value="choral">Choral Singing</option>
                <option value="plants">Indoor Plants</option>
                <option value="roadTrips">Road Trips</option>
              </select>
            </div>

            <div className="flex flex-col items-center gap-2">
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
              {status && (
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={2500}
                  onClose={handleSnackbarClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <MuiAlert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {status}
                  </MuiAlert>
                </Snackbar>
              )}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-24 py-8">
          <div className="grid md:grid-cols-center-3 -mx-4">
            {cardData.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                body={card.body}
                images={card.images} // each card has its own images
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
