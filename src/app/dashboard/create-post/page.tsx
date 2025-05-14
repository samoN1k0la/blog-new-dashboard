"use client";

import * as React from "react";
import { useState, useRef } from "react";
import {
  Stack,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

export default function Page(): React.JSX.Element {
  const editorRef = useRef<any>(null);

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [publishTime, setPublishTime] = useState("");

  const handleUpload = async () => {
    if (!title || !coverImage || !editorRef.current) {
      alert("Please fill in all required fields.");
      return;
    }

    const content = editorRef.current.getContent();
    const token = localStorage.getItem("custom-auth-token");

    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("content", content);

    try {
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Upload failed.");
      }

      alert("Post uploaded successfully!");
      setTitle("");
      setCoverImage(null);
      setImagePreview(null);
      editorRef.current.setContent("");
    } catch (error: any) {
      alert("Error uploading post: " + error.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Box p={4}>
      <Stack spacing={3}>
        <Typography variant="h4">Create a New Post</Typography>

        <Grid container spacing={3}>
          {/* Left: Inputs */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Editor
                onInit={(_, editor) => (editorRef.current = editor)}
                apiKey="gsjh5ldkzg3h31mmsmf5kqd1f4u132vuv1vkp5aikm1b27sd"
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    "anchor", "autolink", "charmap", "codesample", "emoticons", "image", "link", "lists", "media",
                    "searchreplace", "table", "visualblocks", "wordcount", "checklist", "mediaembed", "casechange",
                    "formatpainter", "pageembed", "a11ychecker", "tinymcespellchecker", "permanentpen", "powerpaste",
                    "advtable", "advcode", "editimage", "advtemplate", "ai", "mentions", "tinycomments",
                    "tableofcontents", "footnotes", "mergetags", "autocorrect", "typography", "inlinecss", "markdown",
                    "importword", "exportword", "exportpdf"
                  ],
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                initialValue="Write your content here..."
              />
            </Stack>
          </Grid>

          {/* Right: Additional Fields */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Button variant="outlined" component="label">
                Upload Cover Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {imagePreview && (
                <Box
                  sx={{
                    width: "100%",
                    height: 180,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              )}

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="tech">Tech</MenuItem>
                  <MenuItem value="lifestyle">Lifestyle</MenuItem>
                  <MenuItem value="travel">Travel</MenuItem>
                  <MenuItem value="education">Education</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Tags (comma-separated)"
                variant="outlined"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
              />

              <TextField
                label="Publish Time"
                type="datetime-local"
                value={publishTime}
                onChange={(e) => setPublishTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleUpload}
          sx={{ alignSelf: "flex-start" }}
        >
          Upload Post
        </Button>
      </Stack>
    </Box>
  );
}

